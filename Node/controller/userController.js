const { response } = require("express");
const bcrypt = require("bcryptjs"); 

const Employee = require("../models/Employee.js");

const employeeSignup = async (req , res) => {
    
    try
    {
        const employee = Employee(req.body);
        const result = await employee.save();
        return res.status(201).send({isError: false, result});    
    }
    catch(e)
    {
        //console.log(e);
        return res.status(404).send({isError: true, result :e});
    }
}

const login = async (req,res) => {

    try{
        const { email , password } = req.body;
        const employee = await Employee.findOne({email});
        if(!employee)
        {
           return response.status(404).send({isError: true, result : "Unable to login"});
        }
        const password_matched = await bcrypt.compare(password,employee.password);
        if(!password_matched)
        {
            return response.status(404).send({isError: true, result : "Unable to login"});
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

module.exports = {employeeSignup , login , logout , logoutAll };