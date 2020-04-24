"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);

const multerConfig = {
  dest: _path2.default.resolve(__dirname, '..', '..', 'files', 'attachments'),
  storage: _multer2.default.diskStorage({
    destination: (req, file, callback) => {
      callback(null, _path2.default.resolve(__dirname, '..', '..', 'files', 'attachments'))
    },
    filename: (req, file, callback) => {
      _crypto2.default.randomBytes(16, (err, hash) => {
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

exports. default = multerConfig
