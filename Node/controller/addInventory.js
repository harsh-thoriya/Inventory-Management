const stockModel = require('../models/stock.js')
const requestModel = require('../models/request.js')
const returnModel = require('../models/return.js')
const employeeModel = require('../models/employee.js')
const itemSchema = require('../models/item.js')
const mongoose = require('mongoose')

const addStock = async (req,res,next) => {
    console.log(req.body)
    let stockData = req.body
    const stockItem = new stockModel(stockData)
    await stockItem.save()

    const itemName = req.body.itemName

    let itemModel = mongoose.model('item',itemSchema)

    let findField = await itemModel.find({[itemName]:{ '$exists' : true }})

    if ( findField.length > 0 ){
        let itemNameId = itemName+'Id'
        itemSchema.add({[itemName]:[{
            [itemNameId]:Number,
            issuedDate : Date,
            companyName : String,
            employeeId : mongoose.Schema.Types.ObjectId
        }]})
        itemModel = mongoose.model('item',itemSchema)
        //let fieldItemArray = Array.from(findField.keys())
        console.log(findField[0])
        
        let item = {[itemNameId]:1,companyName:stockData.companyName} 
        let updateData = await itemModel.updateOne({_id:findField[0]._doc._id},{ $push: { [itemName]: item } })
    }
    else{
        console.log("inside else, field not found in db")
        let itemNameId = itemName+'Id'
        itemSchema.add({[itemName]:[{
            [itemNameId]:Number,
            issuedDate : Date,
            companyName : String,
            employeeId : mongoose.Schema.Types.ObjectId
        }]})
        itemModel = mongoose.model('item',itemSchema)
        let itemArray = []
        for(let i=1;i<=stockData.availableQuantity;i++){
            itemArray.push({[itemNameId]:i,companyName:stockData.companyName})
        }

        await new itemModel({[itemName]:itemArray}).save()
        
    }


    res.send("added to stock")
}

module.exports = {addStock}