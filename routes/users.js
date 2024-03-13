const express = require('express')
const userController =  require('../controllers/user.controller')
const router = express.Router()

router.get('/', userController.index)
router.get('/:id', userController.getUser)
router.post('/', userController.signup)
router.post('/login',userController.login)
module.exports = router