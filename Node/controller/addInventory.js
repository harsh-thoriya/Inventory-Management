const stockModel = require('../models/stock.js')
const itemModel = require('../models/item.js')

const addStock = async (req,res,next) => {

    let stockData = req.body
    const itemName = req.body.itemName
    const companyName = req.body.companyName
    try{
        var stockItem = await stockModel.find({$and :[{itemName},{companyName}]})

        if(stockItem.length>0){

            stockItem[0]._doc.availableQuantity = stockItem[0]._doc.availableQuantity+req.body.availableQuantity
            await stockModel.updateOne({itemName,companyName},{'availableQuantity': stockItem[0]._doc.availableQuantity})
            let itemId = stockItem[0]._doc.availableQuantity+stockItem[0]._doc.equippedQuantity+stockItem[0]._doc.garbageQuantity+1
            await new itemModel({
                itemName,
                itemId : itemId,
                companyName
            }).save()

            // let itemArray = []
            // for(let i=stockItem[0]._doc.availableQuantity+stockItem[0]._doc.equippedQuantity-stockData.availableQuantity+1;i<=stockItem[0]._doc.availableQuantity+stockItem[0]._doc.equippedQuantity;i++){
            //     itemArray.push({itemId:i,companyName:stockData.companyName})
            // }
            // let updateData = await itemModel.updateOne({itemName},{ $push: { items: { "$each": itemArray } } })



            return res.send("successfully saved")
        }
        else{

            const stockItem = await new stockModel(stockData).save()

            //let item = await itemModel.find({itemName})
            // if(item.length>0){

            //     let itemArray = []
            //     for(let i=1;i<=stockData.availableQuantity;i++){
            //         itemArray.push({itemId:i,companyName:stockData.companyName})
            //     }
            //     let updateData = await itemModel.updateOne({itemName},{ $push: { items: { "$each": itemArray } } })

            // }
            // else{

            //     let itemArray = []
            //     for(let i=1;i<=stockData.availableQuantity;i++){
            //         itemArray.push({itemId:i,companyName:stockData.companyName})
            //     }
            //     await new itemModel({
            //         itemName:itemName,
            //         items:itemArray
            //     }).save()

            // }

            return res.send({isError:false,result:"successfull"})

        }
        
    }
    catch(e){

        res.send({isError:true,result:e})

    }

}

module.exports = {addStock}
