const express = require('express')
const userController = require('../controllers/userController.js')

const router = express.Router()

router.get('/register', userController.register)
router.post('/register', userController.registerSubmit)
router.get('/login', userController.login)
router.post('/login', userController.loginSubmit)
router.get('/logout', userController.logout)

module.exports = router
