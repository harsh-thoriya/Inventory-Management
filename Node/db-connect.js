const mongoose = require('mongoose')

async function dbConnect(){
    await mongoose.connect(process.env.MONGODBURL ,{useNewUrlParser:true,useFindAndModify:false, useCreateIndex:true, useUnifiedTopology:true}).then((resolved)=>{
        console.log("Database Connected");
    }).catch((rejected)=>{
        console.log("Database connection unsuccessful");
    });
}

dbConnect()


