require("./db-connect.js");
const express = require('express');
const app = express();
const port = process.env.PORT;
app.use(express.json());

const employeeRoutes = require("./routes/employee.js");

app.use(employeeRoutes);

app.listen(port,() => {
    console.log("Server Established");
});



