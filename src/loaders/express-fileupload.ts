import { Express } from 'express'
import fileUpload from 'express-fileupload'

export default (app: Express): void => {
    app.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
        useTempFiles: true,
        tempFileDir: '/tmp/'
    }))
}
