const express = require('express')
require('./db-connect')
const adminRoutes = require('./routes/adminRoutes.js')
const bodyParser = require('body-parser')
const port = process.env.PORT

const app = express()
app.listen(port , (err)=>{
    if(err){
        console.log("error")
    }
    else{
        console.log("successful to", port)
    }
})
app.use(express.json());
app.use('/dashboard',adminRoutes)
// require('./controller/requestReturnHr')