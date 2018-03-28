const express = require('express')
const router = express.Router()
const multer = require('multer')
const photoController = require('../controllers/photo.controller')
const { authenticate } = require('../middleware/auth')
const { sendUploadToGCS } = require('../middleware/upload')

const upload = multer({
  storage: multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

router.get('/', photoController.getAllPhotos)
router.post('/', authenticate, upload.single('image'), sendUploadToGCS, photoController.create)
router.put('/:id', authenticate, photoController.editCaption)
router.delete('/:id', authenticate, photoController.deletion)
router.get('/like/:id', authenticate, photoController.like)

module.exports = router