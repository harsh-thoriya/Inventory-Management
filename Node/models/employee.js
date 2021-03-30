const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR);

//require('dotenv').config({path : "./.env"});

const employeeSchema = new mongoose.Schema({

            firstName :{
                type : String,
                required : true,
                trim : true
            },
            
            lastName :{
                type : String,
                required : true,
                trim : true
            },

            contactNumber : {
                type : Number,
                required : true,
                trim : true,
                minlength : 10
            },
            email :{
                type : String,
                unique:true,
                trim : true,
                required : true,
                lowercase : true, // coverts to lower case
                validate (value)
                {       
                        // validation from npm validator library
                        if( !validator.isEmail(value) || !value.endsWith("@bacancy.com"))
                        {
                            throw new Error("Not a valid email address");
                        }
                        
                }
            },

            isHr : {
                type : Boolean,
                required : true
            },

            password : {
                type : String,
                required : true,
                minlength : 6,
                validate (value)
                {
                    if(validator.contains(value,"password"))
                    {
                        throw Error("Password should not contain 'password' ");
                    }
                }
            },

            tokens : [{
                token: {
                    type:String 
                }
            }],

            profilePicUrl : {
                type : String
            }
});

employeeSchema.methods.toJSON = function () {
    const employee =this
    const employeeObject = employee.toObject()

    delete employeeObject.password
    delete employeeObject.tokens
    //delete employeeObject.avatar
    return employeeObject
}

employeeSchema.methods.generateAuthToken = async function () {
    
    const employee = this;
    const token = jwt.sign({_id : employee._id.toString() } , process.env.JWTKEY);

    const encryptedToken = cryptr.encrypt(token);

    //employee.tokens = employee.tokens.concat({token : encryptedToken})

    //await employee.save();

    return encryptedToken;
   
} 




employeeSchema.pre('save' , async function (next) 
{
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
});

const Employee = mongoose.model('employee',employeeSchema);

module.exports = Employee ;
