const express = require("express");
const {employeeSignup , login , logout, logoutAll , forgotPassword ,resetPasswordEmail, resetPassword , getProfile , updateProfile}  = require("../controller/userController.js");
const auth = require('../middleware/auth.js');
const router = express.Router();


router.post("/signup" , employeeSignup );
router.post("/login", login);
router.get("/logout" , auth , logout);
router.get("/logoutAll", auth ,logoutAll);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", auth , resetPassword);
router.post("/resetPassword/:token" , resetPasswordEmail);
router.get("/profile", auth, getProfile);
router.post("/profile" , auth , updateProfile);


// router.get('/checklogin', auth , async (req,res) => {
//     res.send(req.employee);
// })

module.exports = router ;