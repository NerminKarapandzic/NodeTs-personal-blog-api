import AWS from 'aws-sdk'

export const s3 = new AWS.S3({
    credentials: {
        accessKeyId: process.env.SPACES_ACCESS_KEY,
        secretAccessKey: process.env.SPACES_SECRET_KEY
    },
    endpoint: "fra1.digitaloceanspaces.com"
})