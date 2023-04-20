const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, + Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage, limits: { fileSize: 25 * 1000 * 1000 } });

const cpUpload = upload.fields([
  { name: "files", maxCount: 10 },
  { name: "images", maxCount: 10 }
]);



const parseTextOnlyForm = upload.none()

module.exports ={
    upload_file:cpUpload,
    text_only:parseTextOnlyForm
}