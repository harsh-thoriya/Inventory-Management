const express = require('express')
const { Error } = require('mongoose')

const router = new express.Router()

router.post('/dashboard',hrDashboard())
router.post('')