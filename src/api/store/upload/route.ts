import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import AWS from 'aws-sdk'

interface UploadRequestBody {
    image: string; // base64 encoded image data
    filename: string;
}

export const POST = async (
    req: MedusaRequest, 
    res: MedusaResponse
) => {
    try {
        const { image, filename } = req.body as UploadRequestBody

        if (!image || !filename) {
            return res.status(400).json({ message: "Image and filename are required" })
        }

        const fileContent = Buffer.from(image, 'base64')

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${Date.now()}-${filename}`,
            Body: fileContent,
            ContentType: 'image/jpeg',
            ACL: 'public-read'
        }

        const uploadResult = await s3.upload(params).promise()

        return res.json({
            url: uploadResult.Location
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to upload image",
            error: error.message
        })
    }
}
