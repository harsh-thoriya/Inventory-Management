const bcrypt = require("bcryptjs"); 
const Employee = require("../models/Employee.js");
const sendEmail = require('../utils/sendEmail.js');
const uploadPic = require('../utils/profilePicUpload.js')

const jwt = require("jsonwebtoken");
const Cryptr = require('cryptr');
const AWS = require('aws-sdk');

const cryptr = new Cryptr(process.env.CRYPTR);
require('dotenv').config({path : "../.env"});


const employeeSignup = async (req , res ) => {
    
    try
    {   
        const employee = Employee(req.body);
        const result = await employee.save();
        //const result = '';
        console.log(req.body);

        if(req.body.uploadPic)
        {
            await uploadPic(req,res,employee);
        }
        else{
        return res.status(201).send({isError: false, result});    
        }
        
    }
    catch(e)
    {
        //console.log(e);
        return res.status(404).send({isError: true, result : e});
    }
}

const login = async (req,res) => {

    try{
        const { email , password } = req.body;
        const employee = await Employee.findOne({email});
        if(!employee)
        {
           return res.status(404).send({isError: true, result : "Unable to login"});
        }
        const password_matched = await bcrypt.compare(password,employee.password);
        if(!password_matched)
        {
            return res.status(404).send({isError: true, result : "Unable to login"});
        }
        const encryptedToken = await employee.generateAuthToken();
        res.status(200).send({isError : false , result : {employee,encryptedToken}});

    }
    catch(e)
    {
        res.status(404).send({isError : true , result : e });

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
        res.status(200).send({isError:false, result: "User logged out"});
    }
    catch(e)
    {
        res.status(404).send({isError:true, result: e});

    }
}


const logoutAll = async (req,res) => {
    try{
        const employee = req.employee;
        employee.tokens = [];
        await employee.save()
        res.status(200).send({isError:false, result: "Logged out of all sessions"});
    }
    catch(e)
    {
        res.status(404).send({isError:true, result: e});

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
        res.status(200).send({isError : false, result : "Email sent"});
        
          
    }
    catch(e)
    {
        res.status(404).send({isError : true , result : e});
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
        await employee.save();
        return res.status(200).send({isError:false , result : "Password reset successful"})

    }
    catch(e)
    {
        return res.status(500).send({isError:true , result : e})
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
        return res.status(200).send({isError:false , result : "Password reset successful"})
    }
    catch(e)
    {
        return res.status(500).send({isError:true , result : e})
    }

}

const getProfile = async (req,res) => {
    try{
        const employee = req.employee;
        res.status(200).send({isError : false , result : employee})
    }
    catch(e)
    {
        res.status(404).send({isError : true , result : e})
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
        res.status(200).send(employee);
    }
    catch(e)
    {
        res.status(404).send(e);
    }
}

module.exports = {employeeSignup , login , logout , logoutAll , forgotPassword , resetPassword , resetPasswordEmail , getProfile , updateProfile};