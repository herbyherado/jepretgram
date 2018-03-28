const express = require('express')
const router = express.Router()
const { getAllUsers, create, login, check, deletion } = require('../controllers/user.controller')

router.get('/', getAllUsers)
router.post('/', create)
router.post('/login', login)
router.post('/check', check)
router.delete('/:id', deletion)

module.exports = router