const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/', userController.getAllUsers)
router.post('/', userController.create)
router.post('/login', userController.login)
router.post('/check', userController.check)
router.delete('/:id', userController.deletion)

module.exports = router