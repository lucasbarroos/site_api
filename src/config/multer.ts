import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'files', 'attachments'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', 'files', 'attachments'))
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) {
          callback(err, file.originalname)
        }

        const fileName = `${hash.toString('hex')}-${file.originalname}`
        callback(null, fileName)
      })
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      'image/jpg',
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Invalid file type.'))
    }
  }
}

export default multerConfig
