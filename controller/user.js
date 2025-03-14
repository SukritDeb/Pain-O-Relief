const path = require('path');
const User = require("../models/user");
const User2 = require("../models/patient_details");
const videosuggester=require("../Video_suggest");
async function get_user(req,res){
    return res.render("home")
}
async function get_index(req,res){
    const email=req.cookies.userEmail;
    const user = await User2.findOne({ Email: email });
    
    const  age=Number(user.Age);
    const  pain=user.Pain_Area;
    const link_array=videosuggester(age, pain);
    return res.render("index",{user,link_array})
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
}
module.exports={
    get_user,
    get_index,
    get_login,
    post_login,
    video
}