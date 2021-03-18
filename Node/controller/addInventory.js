const stockModel = require('../models/stock.js')
const requestModel = require('../models/request.js')
const returnModel = require('../models/return.js')
const employeeModel = require('../models/employee.js')


const addStock = async (req,res,next) => {
    console.log(req.body)
    let stockData = req.body
    const stockItem = new stockModel(stockData)
    await stockItem.save()
    res.send("added to stock")
}

module.exports = {addStock}