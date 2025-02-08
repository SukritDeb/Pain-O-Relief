const express = require("express");
const router = express.Router();
const User = require("../models/patient_details");


router.get("/",async(req,res)=>{
    const email=req.cookies.userEmail;
    const user = await User.findOne({ Email: email });
    console.log(user.email);
    return res.render("dashboard.ejs",{user});
});
module.exports = router;