const express = require('express')
const { Error } = require('mongoose')
const addInventory = require('../controller/addInventory.js')

const router = new express.Router()

router.get('/dashboard',hrDashboard())
router.post('/addInventory',addInventory())
router.post('/requestHr',requestHr())
router.post('/returnHr',returnHr())
router.get('/approval',approvalGet())
router.post('/approval',approval())
