#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib'
import { CdkStack } from '../lib/cdk-stack'

const stackName = process.env.GIGS_STACK_NAME
if (!(stackName && stackName.trim() && stackName.trim().length)) {
  console.error('PARAMETER $GIGS_STACK_NAME NOT SET, got:', stackName)
  process.exit(1)
}

const settings = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  stackName: stackName,
  certArn: cdk.Fn.importValue('NJASharedCertArn'),
  permissionsBoundaryPolicyName: 'ScopePermissions',
  domainName: 'infinityworks.academy',
  subDomain: stackName.toLowerCase(),
}

const app = new cdk.App()
new CdkStack(app, `${settings.stackName}-CdkStack`, {
  ...settings,
})
