import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'

/*
   cdk.StackProps includes:
   {
     env?: {
       account?: string,
       region?: string,
     },
     stackName?: string,
   }
*/
export interface GigsSettings extends cdk.StackProps {
  certArn: string, // new
  permissionsBoundaryPolicyName: string,
  domainName: string, // new
  subDomain: string,
  }

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GigsSettings) {
    super(scope, id, props)

    // Domain variables go here - to use in route 53 etc
    // TODO

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

    // Lookup cert for domain *.ngei-sot.academy
    // TODO

    // Bucket to put static flyer data in
    const flyersBucket = new s3.Bucket(this, 'flyers-hosting', {
      bucketName: `${props.subDomain}-flyers-hosting`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // security
      encryption: s3.BucketEncryption.S3_MANAGED // security
    })
    flyersBucket.addToResourcePolicy( // security
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
    // Copy flyers into bucket
    const flyersDeployment = new s3Deployment.BucketDeployment(this, 'flyers-deployment', {
      destinationBucket: flyersBucket,
      sources: [ s3Deployment.Source.asset('../gig-flyers') ],
      retainOnDelete: false,
      // TODO - more settings
      prune: true,
      memoryLimit: 256, // react folder can be big
    })

    new cdk.CfnOutput(this, 'FlyersBucketName', {
      value: flyersBucket.bucketName,
    })

    // Bucket to put static react code in later
    const clientBucket = new s3.Bucket(this, 'client-hosting', {
      bucketName: `${props.subDomain}-client-hosting`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // security
      encryption: s3.BucketEncryption.S3_MANAGED // security
    })
    clientBucket.addToResourcePolicy( // security
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

    // Copy react output into bucket
    const clientDeployment = new s3Deployment.BucketDeployment(this, 'client-deployment', {
      destinationBucket: clientBucket,
      sources: [ s3Deployment.Source.asset('../client/dist') ],
      retainOnDelete: false,
      // TODO - more settings
      prune: true,
      memoryLimit: 256, // react folder can be big
    })


    new cdk.CfnOutput(this, 'ClientBucketName', {
      value: clientBucket.bucketName,
    })

    // Flyers distribution - Cloudfront sits in front of S3 bucket
    // TODO

    // Flyers outputs
    // TODO

    // Route 53 glue between DNS and CloudFront
    // TODO

    // Route 53 outputs
    // TODO

  }
}
