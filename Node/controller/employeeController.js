const express = require('express')
const Request = require('../models/request')
const Return = require('../models/return')
const Stock = require('../models/stock')
const Item = require('../models/item')



// module.exports.return_get = (req,res)=>{
//     res.render('employee/return')
// }

//return item request
module.exports.return_post = async (req, res) => {
    const employeeId = req.employee._id;
    const itemName = req.body.itemName;
    const reason = req.body.reason;
    const companyName = req.body.companyName;
    const condition = req.body.condition;
    const serialNumber = req.body.serialNumber

    const data = await new Return({
        employeeId: employeeId,
        itemName: itemName,
        reason: reason,
        condition: condition,
        companyName: companyName
    });

    if (req.body.condition == 1) {
        const stock_data = await Stock.updateOne({ itemName: itemName, companyName: companyName }, { $inc: { equippedQuantity: -1, availableQuantity: 1 } });

        console.log(stock_data);

        const itemUpdate = await Item.updateOne(
            { itemName: itemName, items: { $elemMatch: { companyName, itemId: serialNumber } } },
            {
                $set: {
                    "items.$.employeeId": undefined,
                    "items.$.issuedDate": undefined
                }
            }
        )

        try {
            await data.save()
            //res.render('employee/return')
            res.send({ data, stock_data, itemUpdate })
        }
        catch (e) {
            res.send(e)
        }
    }
    else {
            const stockUpdate = await stockModel.updateOne({ itemName: itemName, companyName: companyName },{
                $inc : { 
                    equippedQuantity : -1
                }
            })
            const deleteitem = await itemModel.updateOne({itemName},
                { $pull: { items: { companyName, itemId: serialNumber } } } 
            )
    
            console.log(deletitem)
        }
}


// module.exports.request_get = (req, res) => {
//     res.render('employee/request')
// }


//get all item request
module.exports.request_get = async (req, res) => {
    const data = await Request.find({ employeeId: req.employee._id })
    res.send(data)

}

//request item to hr
module.exports.request_post = async (req, res) => {
    const data = await new Request({
        employeeId: req.employee._id,
        itemName: req.body.items,
        reason: req.body.reason,
        requestTime: Date.now()
    })
    console.log(data);
    try {
        await data.save()
        //res.render('employee/request')
        res.send({ data })
    }
    catch (e) {
        res.send(e)
    }
}

//delete pending request
module.exports.request_delete = async (req, res) => {
    const data = await Request.deleteOne({ employeeId: req.employee._id, status: 0 })
    console.log(data)
    try {

        //await data.save()
        res.send(data)
    }
    catch (e) {
        res.send(e)
    }
}

module.exports.request_item = async (req, res) => {
    const data = await new Item({
        itemId: req.body.itemId,
        serialNumber: req.body.serialNumber
    })
    console.log(data)
    try {
        await data.save()
        res.send(data)
    }
    catch (e) {
        res.send(e)
    }

}