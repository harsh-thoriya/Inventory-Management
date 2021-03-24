const AWS = require('aws-sdk');
const employee = require("../models/employee.js");
const { successResponse, errorResponse } = require('./responseFormat.js');
require('dotenv').config();

const uploadPic = async (req, res , employee)  => {

    try{
        // console.log(process.env.AWS_ACCESSKEYID);
        // console.log(process.env.AWS_SECRETACCESSKEY);
        // console.log(process.env.AWS_SESSIONTOKEN);
        // console.log(req.body.email);
        const S3 = new AWS.S3({
        accessKeyId : process.env.AWS_ACCESSKEYID,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY,
        sessionToken: process.env.AWS_SESSIONTOKEN
        })
        
        const params = {
            Bucket: 'prcts3',
            Key : req.body.email+'_profile_pic.jpg',
            Body: req.file.buffer,
            ContentType: 'image/jpg'
        }
        //console.log("Buffer :::: ",req.file.buffer)
        //console.log("String Buffer :::: ",req.file.buffer.toString())
        S3.upload(params, async (err,data)=>{
            if(err){
                console.log(err)
                return errorResponse(req,res,'','Cannot upload picture');
                
            }
            else{
                url = data.Location
                console.log(url);  
                employee.profilePicUrl = url;
                await employee.save();
                return successResponse(req,res,employee,'Employee registration successful',201);
            }
        })
    }
    catch(e){
        console.log(e);
    }    
}

module.exports = uploadPic;