const bcrypt = require("bcryptjs"); 
const Employee = require("../models/employee.js");
const sendEmail = require('../utils/sendEmail.js');
const uploadPic = require('../utils/profilePicUpload.js')
const jwt = require("jsonwebtoken");
const Cryptr = require('cryptr');
const AWS = require('aws-sdk');
const { successResponse, errorResponse } = require("../utils/responseFormat.js");

const cryptr = new Cryptr(process.env.CRYPTR);
require('dotenv').config({path : "../.env"});


const employeeSignup = async (req , res ) => {
    
    try
    {   
        const employee = Employee(req.body);
        console.log(req.body);
        const result = await employee.save();
        //const result = '';

        if(req.body.uploadPic)
        {
            await uploadPic(req,res,employee);
        }
        else{
        return successResponse(req,res,result,"Employee registration successfull",201);  
        }
        
    }
    catch(e)
    {
        //console.log(e);
        return errorResponse(req,res,e);
    }
}

const login = async (req,res) => {

    try{
        const { email , password } = req.body;
        const employee = await Employee.findOne({email});
        if(!employee)
        {
           return errorResponse(req,res,'','Unable to login',404)
        }
        const password_matched = await bcrypt.compare(password,employee.password);
        if(!password_matched)
        {
            return errorResponse(req,res,'','Unable to login',404)
        }
        const encryptedToken = await employee.generateAuthToken();
        return successResponse(req,res, {employee,encryptedToken} , "Employee logged in !");

    }
    catch(e)
    {
        return errorResponse(req,res,e)
    }

}

const logout = async (req,res) => {
    try{
        const employee = req.employee;
        const encryptedToken = req.encryptedToken;
        employee.tokens = employee.tokens.filter((element) => {
            return element.token != encryptedToken;
        });

        await employee.save();
        return successResponse(req,res,'','User logged out');     
    }
    catch(e)
    {
        return errorResponse(req,res,e);
    }
}


const logoutAll = async (req,res) => {
    try{
        const employee = req.employee;
        employee.tokens = [];
        await employee.save()
        return successResponse(req,res,'','Logged out of all sessions');
        
    }
    catch(e)
    {
        return errorResponse(req,res,e)
    }
}

const forgotPassword = async (req,res) => {
    
    try{
        const email = req.body.email;
        const employee = await Employee.findOne({ email });
        if(!employee)
        {
            throw 'User not registered';
        }
        employee.tokens = [];
        await employee.save();


        const token = jwt.sign({_id : employee._id.toString() } , process.env.JWTKEY , {expiresIn: '10m'});

        const encryptedToken = cryptr.encrypt(token);

        employee.tokens = employee.tokens.concat({token : encryptedToken})

        await employee.save();
        
        
        const link = 'http://localhost:'+process.env.PORT+'/resetPassword/'+encryptedToken;
        await sendEmail(email,link);
        return successResponse(req,res,'','Email sent');
            
    }
    catch(e)
    {
        return errorResponse(req,res,e);    
    }


}

const resetPasswordEmail = async (req,res) => {
    try{
        const password = req.body.password;
        const confirm_password = req.body.confirmPassword;
        if(password !== confirm_password)
        {
            throw "Password does not match";
        }
        
        const token = cryptr.decrypt(req.params.token);
        //console.log(req.params.token);
        const payload = jwt.verify(token,process.env.JWTKEY);
        const employee = await Employee.findOne({ _id :payload._id , 'tokens.token' : req.params.token})
        if(!employee)
        {
            throw "Not authenticate user";
        }
        employee.password = password;
        employee.tokens = [];
        await employee.save();
        return successResponse(req,res,'','Password reset successful');

    }
    catch(e)
    {
        return errorResponse(req,res,e);    
    }
}

const resetPassword = async (req,res) => {
    try{
        const employee = req.employee;
        const password = req.body.password;
        const confirm_password = req.body.confirmPassword;
        if(password !== confirm_password)
        {
            throw "Password does not match";
        }
        employee.password = password;
        employee.tokens = [];
        await employee.save();
        return successResponse(req,res,'','Password reset successful');
    }
    catch(e)
    {
        return errorResponse(req,res,e);    
    }

}

const getProfile = async (req,res) => {
    try{
        const employee = req.employee;
        return successResponse(req,res,employee,'Employee profile');
    }
    catch(e)
    {
        return errorResponse(req,res,e);    
    }
}

const updateProfile = async (req,res) => {
    try{
        const employee = req.employee;
        const allowedUpdates = ['firstName','lastName','contactNumber'];
        const requestedChanges = Object.keys(req.body);
        const isValidOperation = requestedChanges.every((element) => allowedUpdates.includes(element));
        if(!isValidOperation)
        {
            throw "Not a valid update";
        }
        requestedChanges.forEach((element) => {
            employee[element] = req.body[element];
        });
        await employee.save();
        return successResponse(req,res,employee,'Employee profile updated successfully');
    }
    catch(e)
    {
        return errorResponse(req,res,e);    
    }
}

module.exports = {employeeSignup , login , logout , logoutAll , forgotPassword , resetPassword , resetPasswordEmail , getProfile , updateProfile};