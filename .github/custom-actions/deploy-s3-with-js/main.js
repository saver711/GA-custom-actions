const core = require("@actions/core")
const exec = require("@actions/exec") // This is used to run shell commands from Node.js
// const AWS = require("aws-sdk") // We can use this, but for now, let's use the exec module to run the AWS CLI commands directly
// The ubuntu runner already has the AWS CLI installed, so we can use it directly without needing to install the AWS SDK for JavaScript -> https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2404-Readme.md#cli-tools
function run() {
  // 1) Get the input parameters
  const bucketName = core.getInput("s3-bucket", { required: true }) // Required here will cause the action to fail if it does not receive this input
  const awsRegion = core.getInput("aws-region", { required: true })
  const distFolder = core.getInput("dist-folder", { required: true })

  // 2) Upload the files to S3
  const uploadCommand = `aws s3 sync ${distFolder} s3://${bucketName} --region ${awsRegion}`
  exec.exec(uploadCommand)

  const websiteUrl = `http://${bucketName}.s3-website-${awsRegion}.amazonaws.com`
  core.setOutput("website-url", websiteUrl) // This will set the output variable that can be used in other steps of the workflow
}
run()
