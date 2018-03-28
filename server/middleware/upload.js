const multer = require('multer')
const Storage = require('@google-cloud/storage')

const config = {
  CLOUD_BUCKET: 'jepretgram.herbyherado.com',
  PROJECT_ID: 'herbyherado'
}

const storage = Storage({
  projectId: config.PROJECT_ID,
  keyFilename: 'herbyherado-9e0f97ccfeb0.json'
})

const bucket = storage.bucket(config.CLOUD_BUCKET)

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

module.exports = {
  sendUploadToGCS: (req, res, next) => {
    console.log('masuk')
    if(!req.file) {
      return next('Failed to upload')
    }
    const gcsname = Date.now() + '.' + req.file.originalname.split('.').pop();
    const file = bucket.file(gcsname);
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    })
  
    stream.on('error', err => {
      req.file.cloudStorageError = err
      next(err)
    })
  
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsname
      file.makePublic()
        .then(() => {
          req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
          next()
        })
    })
    stream.end(req.file.buffer)
  }
}
