const express = require('express')
//require('dotenv').config({path:'../.env'})
const mongodbConnect = require('./db-connect.js')
const adminRoutes = require('./routes/adminRoutes.js')
const bodyParser = require('body-parser')

const app = express()
app.listen(process.env.PORT || 3001 , (err)=>{
    if(err){
        console.log("error")
    }
    else{
        console.log("successful")
    }
})
app.use(bodyParser.json());
app.use('/dashboard',adminRoutes)