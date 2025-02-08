const express=require("express")
const router=express.Router();
const User = require("../models/user");
const User2 = require("../models/patient_details");
router.get("/",async(req,res)=>{
    return res.render("home")
});
router.get("/index",async(req,res)=>{
    const email=req.cookies.userEmail;
    const user = await User2.findOne({ Email: email });
    console.log(user);
    return res.render("index",{user})
});
router.get("/login", (req, res) => {
    const error = req.session.error; 
    req.session.error = null; 
    res.render("login", { error }); 
});
router.post("/login",async (req,res)=>{
    const body=req.body;
    const user_by_mail=await User.findOne({ Email: body.email });
    if(!user_by_mail){
        req.session.error = "Invalid username or password!";
        res.redirect('/login');
    }
    else if(user_by_mail.Password==body.password){
        res.cookie("userEmail", body.email, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.redirect('/index');
        
    }else{
        req.session.error = "Invalid username or password!";
        res.redirect('/login');
    }
    
});
module.exports = router;