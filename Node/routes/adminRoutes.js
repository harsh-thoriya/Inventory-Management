const express = require('express')
const { Error } = require('mongoose')
const addInventory = require('../controller/addInventory.js')
const {requestHr, returnHr,test} = require('../controller/requestReturnHr')

const router = new express.Router()

//router.get('/dashboard',hrDashboard())
router.post('/addInventory',addInventory.addStock)
router.post('/requestHr',requestHr)
router.post('/returnHr',returnHr)

//router.get('/approval',approvalGet())
//router.post('/approval',approval())

module.exports = router