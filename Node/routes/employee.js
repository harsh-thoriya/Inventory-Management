const express = require("express");
const {employeeSignup , login , logout, logoutAll}  = require("../controller/userController.js");
const auth = require('../middleware/auth.js');
const router = express.Router();


router.post("/signup" , employeeSignup );
router.post("/login", login)
router.get("/logout" , auth , logout);
router.get("/logoutAll", auth ,logoutAll);

// router.get('/checklogin', auth , async (req,res) => {
//     res.send(req.employee);
// })

module.exports = router ;