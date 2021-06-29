const express = require('express')
const Request = require('../models/request')
const Return = require('../models/return')
const employeeController = require('../controller/employeeController')
const router = new express.Router()
const auth = require("../middleware/auth")
const Item = require('../models/item')



// router.get('/request',auth, employeeController.request_get)
router.post('/request', auth, employeeController.request_post)
// router.get('/return', employeeController.request_get)
router.post('/return', auth, employeeController.return_post)
router.get('/home', auth, employeeController.request_get)
router.delete('/request', auth, employeeController.request_delete)

module.exports = router
