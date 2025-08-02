const AWS = require("aws-sdk")
const path = require("path")
const fs = require("fs")
const mime = require("mime-types")

function run() {
  // In the action.yml file, we have defined the inputs, Github will automatically
  // pass the inputs as environment variables like this: INPUT_<INPUT_NAME all in uppercase>
  const bucket = process.env.INPUT_S3_BUCKET
  const bucketRegion = process.env.INPUT_AWS_REGION
  const distFolder = process.env.INPUT_DIST_FOLDER

  const configuration = {
    region: bucketRegion
  }

  const s3Client = new AWS.S3(configuration)

  function walkSync(dir, fileList = []) {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      const filePath = path.join(dir, file)
      if (fs.statSync(filePath).isDirectory()) {
        walkSync(filePath, fileList)
      } else {
        fileList.push(filePath)
      }
    })
    return fileList
  }

  const files = walkSync(distFolder)

  const uploadPromises = files.map(filePath => {
    const key = filePath.replace(distFolder + path.sep, "").replace(/\\/g, "/")
    const params = {
      Bucket: bucket,
      Key: key,
      Body: fs.createReadStream(filePath),
      ContentType: mime.lookup(filePath) || "application/octet-stream"
    }

    return s3Client.upload(params).promise()
  })

  Promise.all(uploadPromises)
    .then(() => {
      const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
      fs.appendFileSync(
        process.env.GITHUB_OUTPUT,
        `website-url=${websiteUrl}\n`
      )
    })
    .catch(error => {
      console.error("Error uploading files:", error)
      process.exit(1)
    })
}

run()
