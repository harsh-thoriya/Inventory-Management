require("./db-connect.js");
const express = require('express');
const multer = require('multer');
const app = express();
const port = process.env.PORT;
app.use(express.json());


const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '')
    }
})
  
const filefilter = (req,file,callback)=>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    callback(null,true)
  }
  else{
    callback(null,false)
  }
}


app.use(multer({storage , filefilter }).single('profilePic'));

const employeeRoutes = require("./routes/employee.js");

app.use(employeeRoutes);

app.listen(port,() => {
    console.log("Server Established");
});



