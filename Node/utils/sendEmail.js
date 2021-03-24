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
        html: '<html><body><h3>Kindly use this link to resest your password !</h3><br><a href='+link+'>LINK</a></body></html>' 
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