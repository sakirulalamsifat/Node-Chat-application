const multer = require('multer')
const path = require('path')
const createError = require('http-errors')
function uploader(subfolder_path, allowed_file_type, max_file_size, error_msg) {
  const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`

  //define storage

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_FOLDER)
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname)
      const fileName =
        file.originalname
          .replace(fileExt, '')
          .toLocaleLowerCase()
          .split(' ')
          .join('-') +
        '-' +
        Date.now()
      cb(null, fileName + fileExt)
    },
  })

  // preapre the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_type.includes(file.mimetype)) {
        cb(null, true)
      } else {
        cb(createError(error_msg))
      }
    },
  })

  return upload
}

module.exports = uploader;
