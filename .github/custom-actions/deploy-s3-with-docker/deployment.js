const core = require("@actions/core")
const exec = require("@actions/exec")
function run() {
  // 1) Get the input parameters
  const bucketName = core.getInput("s3-bucket", { required: true })
  const awsRegion = core.getInput("aws-region", { required: true })
  const distFolder = core.getInput("dist-folder", { required: true })

  // 2) Upload the files to S3
  const uploadCommand = `aws s3 sync ${distFolder} s3://${bucketName} --region ${awsRegion}`
  exec.exec(uploadCommand)

  const websiteUrl = `http://${bucketName}.s3-website-${awsRegion}.amazonaws.com`
  core.setOutput("website-url", websiteUrl)
}
run()
