const express = require('express')
const addressController = require('../controllers/address.controller')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()

router.post('/save',checkAuth.checkAuth, addressController.save)

module.exports = router
