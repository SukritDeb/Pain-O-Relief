const path = require('path');
const User = require("../models/user");
const {jwtAuthMiddleware, generateToken} = require('./../auth');
const User2 = require("../models/patient_details");
const videosuggester=require("../Video_suggest");
async function get_user(req,res){
    return res.render("home")
}
async function get_index(req,res){
    const user = await User2.findOne({ Email: req.user});
    const  age=Number(user.Age);
    const  pain=user.Pain_Area;
    const link_array=videosuggester(age, pain);
    res.render("index",{user,link_array})
}
async function get_login(req,res){
    const error = req.session.error; 
    req.session.error = null; 
    res.render("login", { error }); 
}
async function video(req,res){
    res.sendFile(path.join(__dirname, '../video_call/index.html'));
}
async function post_login(req,res){
    const body=req.body;
    const user_by_mail=await User.findOne({ Email: body.email });
    if(!user_by_mail){
        req.session.error = "Invalid username or password!";
        res.redirect('/login');
    }
    else if(user_by_mail.Password==body.password){
        const payload=body.email;
        const token = generateToken(payload);
        res.cookie("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production'? true : false, sameSite: "Strict" });
        return res.redirect('/index');
        
    }else{
        req.session.error = "Invalid username or password!";
        return res.redirect('/login');
    }
}
async function logoutuser(req,res){
    res.clearCookie("auth_token");
    res.redirect("/")
}
module.exports={
    get_user,
    get_index,
    get_login,
    post_login,
    video,
    logoutuser
}