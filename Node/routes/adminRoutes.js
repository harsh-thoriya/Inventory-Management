const express = require('express')
const { Error } = require('mongoose')
const addInventory = require('../controller/addInventory.js')
const approval = require('../controller/requestApproval.js')
const {requestHr, returnHr} = require('../controller/hrRequestReturn.js')
const hrDashboard = require('../controller/dashboard.js')
const getEquippedItems = require('../controller/equippedItems.js')
const updateStock = require('../controller/updateStock.js')

const router = new express.Router()

router.get('',hrDashboard.dashboard)
router.post('/addInventory',addInventory.addStock)
router.post('/requestHr',requestHr)
router.post('/returnHr',returnHr)
router.get('/equippedItems',getEquippedItems)
//router.get('/approval',approvalGet())
router.post('/approval',approval.requestApproval)
router.post('/rejection',approval.requestRejection)
router.post('/updateStock',updateStock)

module.exports = router