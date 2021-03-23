require("./db-connect.js");
const express = require('express');
const app = express();
const port = process.env.PORT;
app.use(express.json());

const employeeRoutes = require("./routes/employee.js");
const RequestRouter = require("./routes/employeeRoute");
const adminRoutes = require("./routes/adminRoutes")

app.use(employeeRoutes);
app.use(RequestRouter);
app.use(adminRoutes)

app.listen(port,() => {
    console.log("Server Established");
});



