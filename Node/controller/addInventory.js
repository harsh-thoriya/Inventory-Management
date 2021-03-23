const stockModel = require('../models/stock.js')
const itemModel = require('../models/item.js')

const addStock = async (req,res,next) => {

    let stockData = req.body
    const itemName = req.body.itemName
    const companyName = req.body.companyName
    const incomingQuantity = req.body.incomingQuantity
    try{
        var stockItem = await stockModel.find({$and :[{itemName},{companyName}]})

        if(stockItem.length>0){

            
            let itemId = stockItem[0]._doc.availableQuantity+stockItem[0]._doc.equippedQuantity+stockItem[0]._doc.garbageQuantity+1
            stockItem[0]._doc.availableQuantity = stockItem[0]._doc.availableQuantity + incomingQuantity
            await stockModel.updateOne({itemName,companyName},{'availableQuantity': stockItem[0]._doc.availableQuantity})
            //await new itemModel({
            //    itemName,
            //    itemId,
            //    companyName
            //}).save()

            //let itemArray = []
            let loopCount = stockItem[0]._doc.availableQuantity
                        
            for(let i=itemId;i<=loopCount;i++){
                await new itemModel({itemId:i,itemName,companyName}).save()
            }
            //let updateData = await itemModel.updateOne({itemName},{ $push: { items: { "$each": itemArray } } })

            return res.send("successfully saved")
        }
        else{

            const stockItem = await new stockModel({
                itemName,
                companyName,
                availableQuantity:incomingQuantity
            }).save()

            for(let i=1;i<=incomingQuantity;i++){
                await new itemModel({itemId:i,itemName,companyName}).save()
            }

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
        console.log(e)
        res.send({isError:true,result:e})

    }

}

module.exports = {addStock}
