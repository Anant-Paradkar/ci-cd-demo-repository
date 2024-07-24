import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import { Construct } from 'constructs'

export type Props  = cdk.StackProps & {
  certArn: string,
  permissionsBoundaryPolicyName: string,
  domainName: string,
  subDomain: string,
}

export class CdkStack extends cdk.Stack {

  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor (scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    // to use in route 53 etc
    const fullDomain = `${props.subDomain}.${props.domainName}`
    const flyerDomain = `flyers-${props.subDomain}.${props.domainName}`

    // These ones are mine
    cdk.Tags.of(this).add('Name', props.stackName!)
    cdk.Tags.of(this).add('Academy', props.stackName!)

    // Set a permissions boundary
    const boundary = iam.ManagedPolicy.fromManagedPolicyName(
      this,
      'Boundary',
      props.permissionsBoundaryPolicyName,
    )
    iam.PermissionsBoundary.of(this).apply(boundary)

    // Lookup cert for domain *.infinityworks.academy
    const cert = acm.Certificate.fromCertificateArn(
      this,
      `cert`,
      props.certArn,
    )

    // Bucket to put static flyer data in
    const flyersBucket = new s3.Bucket(this, `flyers-hosting`, {
      bucketName: `${props.subDomain}-flyers-hosting`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, //security
      encryption: s3.BucketEncryption.S3_MANAGED //security
    })
    flyersBucket.addToResourcePolicy( //security
      new iam.PolicyStatement({
        resources: [
          flyersBucket.arnForObjects('*'),
          flyersBucket.bucketArn
        ],
        actions: [ 's3:*' ],
        effect: iam.Effect.DENY,
        conditions: {
          Bool: { 'aws:SecureTransport': 'false' }
        },
        principals: [ new iam.AnyPrincipal() ],
      })
    )

    new cdk.CfnOutput(this, 'FlyersBucketName', {
      value: flyersBucket.bucketName,
    })

    // Bucket to put static react code in later
    const clientBucket = new s3.Bucket(this, `client-hosting`, {
      bucketName: `${props.subDomain}-client-hosting`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, //security
      encryption: s3.BucketEncryption.S3_MANAGED //security
    })
    clientBucket.addToResourcePolicy( //security
      new iam.PolicyStatement({
        resources: [
          clientBucket.arnForObjects('*'),
          clientBucket.bucketArn
        ],
        actions: [ 's3:*' ],
        effect: iam.Effect.DENY,
        conditions: {
          Bool: { 'aws:SecureTransport': 'false' }
        },
        principals: [ new iam.AnyPrincipal() ],
      })
    )
    new cdk.CfnOutput(this, 'ClientBucketName', {
      value: clientBucket.bucketName,
    })

    // Cloudfront sits in front of S3 bucket
    const flyersDistribution = new cloudfront.Distribution(this, `flyers-distribution`,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(flyersBucket),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        defaultRootObject: 'index.html',
        domainNames: [ flyerDomain ],
        certificate: cert,
      }
    )
    // Copy flyers into bucket
    const flyersDeployment = new s3Deployment.BucketDeployment(this, `flyers-deployment`, {
      destinationBucket: flyersBucket,
      sources: [ s3Deployment.Source.asset('../gig-flyers') ],
      retainOnDelete: false,
      distribution: flyersDistribution, // invalidate this
      distributionPaths: [ '/*' ], // invalidate everything
      prune: true,
      memoryLimit: 256, // react folder can be big
    })
    new cdk.CfnOutput(this, 'FlyersDistributionDNS', {
      value: flyersDistribution.distributionDomainName
    })
    new cdk.CfnOutput(this, 'FlyersSampleDNS', {
      value: `https://${flyersDistribution.distributionDomainName}/gig-001-flyer.pdf`
    })

    // Route 53 glue between DNS and CloudFront
    const zone = route53.HostedZone.fromLookup(this, 'zone', {
      domainName: props.domainName,
    })
    new route53.CnameRecord(this, `flyers-record`, {
      zone,
      domainName: flyersDistribution.domainName,
      recordName: flyerDomain,
    })
    new cdk.CfnOutput(this, 'FlyersUrl', {
      value: `https://${flyerDomain}`,
    })
    new cdk.CfnOutput(this, 'FlyersExampleUrl', {
      value: `https://${flyerDomain}/gig-001-flyer.pdf`,
    })

    // Redirects lambda to send folks to the right place in cloudfront
    const redirectsFunction = new cloudfront.Function(this,
      'redirects-function',
      {
        code: cloudfront.FunctionCode.fromFile({
          filePath: 'functions/redirects.js',
        }),
      }
    )

    // CLIENT DISTRIBUTION + R53 FOR REACT WOULD GO HERE //
    // Cloudfront sits in front of S3 bucket
    const clientDistribution = new cloudfront.Distribution(this, `client-distribution`,
      {
        defaultBehavior: {
          origin: new origins.S3Origin(clientBucket),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          functionAssociations: [ // extra bit here
            { // redirects handler
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: redirectsFunction,
            },
          ],
          originRequestPolicy: // extra bit here
            new cloudfront.OriginRequestPolicy(
              this,
              `request-policy`,
              {
                queryStringBehavior:
                  cloudfront.OriginRequestQueryStringBehavior.all()
              }),
        },
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        defaultRootObject: 'index.html',
        domainNames: [ fullDomain ],
        certificate: cert,
      }
    )
    // Copy react output into bucket
    const clientDeployment = new s3Deployment.BucketDeployment(this, `client-deployment`, {
      destinationBucket: clientBucket,
      sources: [ s3Deployment.Source.asset('../client/dist') ],
      retainOnDelete: false,
      distribution: clientDistribution, // invalidate this
      distributionPaths: [ '/*' ], // invalidate everything
      prune: true,
      memoryLimit: 256, // react folder can be big
    })
    new route53.CnameRecord(this, `client-record`, {
      zone,
      domainName: clientDistribution.domainName,
      recordName: fullDomain,
    })
    new cdk.CfnOutput(this, 'ClientUrl', {
      value: `https://${fullDomain}`,
    })
  }
}
