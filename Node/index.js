require("./db-connect.js");
const express = require('express');
const app = express();
const port = process.env.PORT;
app.use(express.json());

const employeeRoutes = require("./routes/employee.js");
const RequestRouter = require("./routes/employeeRoute");

app.use(employeeRoutes);
app.use(RequestRouter);

app.listen(port,() => {
    console.log("Server Established");
});



