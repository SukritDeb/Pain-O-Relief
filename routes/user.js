const express=require("express")
const router=express.Router();
const User = require("../models/user");
router.get("/",async(req,res)=>{
    return res.render("home")
});
router.get("/index",async(req,res)=>{
    return res.render("index")
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
        res.redirect('/index');
    }else{
        req.session.error = "Invalid username or password!";
        res.redirect('/login');
    }
    
});
module.exports = router;