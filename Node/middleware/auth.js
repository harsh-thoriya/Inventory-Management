const jwt = require('jsonwebtoken');
const Employee = require("../models/Employee.js");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR);

const auth = async (req,res,next) =>
{
    try{
        const encryptedToken = req.header('Authorization').replace('Bearer ','');
        // console.log(encryptedToken);
        const token = cryptr.decrypt(encryptedToken);
        const tokenPayload =  jwt.verify(token,process.env.JWTKEY);
        const employee = await Employee.findOne({_id : tokenPayload._id , 'tokens.token' : encryptedToken});

        if(!employee)
        {
            throw new Error('Please authenticate');
        }

        req.encryptedToken=encryptedToken;
        req.employee = employee;
        next();
    }
    catch(e)
    {
        res.status(404).send( {isError:false , result : e} );
    }
}

module.exports = auth;