const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('you are now connected to server')
})

module.exports = router