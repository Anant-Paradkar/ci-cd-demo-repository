#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CdkStack, GigsSettings } from '../lib/cdk-stack'

const stackName: string = process.env.GIGS_STACK_NAME || ''
if (!(stackName && stackName.trim() && stackName.trim().length > 0)) {
  console.error(`PARAMETER $GIGS_STACK_NAME NOT SET, got: '${stackName}'`)
  process.exit(1)
}

const domainName: string = process.env.GIGS_DOMAIN || ''
if (!(domainName && domainName.trim() && domainName.trim().length > 0))
{
console.error(`PARAMETER $GIGS_DOMAIN NOT SET, got: '${domainName}'`)
process.exit(1)
}

const settings: GigsSettings = {
  // Inherited from cdk.StackProps
  env: {
  account: process.env.CDK_DEFAULT_ACCOUNT || 'NOT_SET',
  region: process.env.CDK_DEFAULT_REGION || 'NOT_SET',
  },
  stackName: stackName,
  // Our own properties
  certArn: cdk.Fn.importValue('SoTSharedCertArn'), // new
  permissionsBoundaryPolicyName: 'ScopePermissions',
  domainName: domainName.toLowerCase(), // new
  subDomain: stackName.toLowerCase(),
  }

const app = new cdk.App()
new CdkStack(app, `${settings.stackName}-TS-CdkStack`, settings)
