require('dotenv').config({path : '../.env'});
const nodemailer = require('nodemailer');


const sendEmail = async function (email,link) {
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset password',
        text: 'Kindly use this link to resest your password !' + link 
      };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);  
            
            } else {
                console.log(info.response);
            }
        });
         
}
module.exports = sendEmail;