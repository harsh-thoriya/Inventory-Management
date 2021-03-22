const express = require('express')
const { Error } = require('mongoose')
const addInventory = require('../controller/addInventory.js')
const approval = require('../controller/requestApproval.js')
const {requestHr, returnHr} = require('../controller/hrRequestReturn.js')

const router = new express.Router()

//router.get('/dashboard',hrDashboard())
router.post('/addInventory',addInventory.addStock)
router.post('/requestHr',requestHr)
router.post('/returnHr',returnHr)

//router.get('/approval',approvalGet())
router.post('/approval',approval.requestApproval)
router.post('/rejection',approval.requestRejection)

module.exports = router