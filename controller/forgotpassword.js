const User = require("../models/user");
async function get_forgetpassword(req,res){
    const error = req.session.error; 
    req.session.error = null; 
    res.render("forgotpassword", { error }); 
}
async function post_forgetpassword(req,res){
    const body = req.body;
    const user_email = body.email;
    try {
        const result = await User.findOne({ Email: user_email });

        if (result) {
            req.session.user_email = user_email;
            return res.render(otp);
        } 
        req.session.error = "User does not exist! Create an account...";
        return res.redirect("/forgotpassword");
    } catch (err) {
        console.error(err);
        req.session.error = "SERVER ERROR";
        res.redirect("/forgotpassword");
    }
}
async function get_passwordreset(req,res){
    res.render("password_reset", { error: null });
}
async function post_submitpassword(req,res){
    const body = req.body;

    function validPassword(str) {
        const hasNumbers = /\d/.test(str);
        const hasSpecialChars = /[^a-zA-Z0-9]/.test(str);
        const hasAlphabets = /[a-zA-Z]/.test(str);
        return hasNumbers && hasSpecialChars && hasAlphabets;
    }

    if (!validPassword(body.password)) {
        return res.render("password_reset", { error: "Password must contain at least one digit, one special character, and one alphabet." });
    }

    if (body.password !== body.confirm_password) {
        return res.render("password_reset", { error: "Passwords do not match. Please try again." });
    }

    try {
        await User.updateOne({
            Email: req.session.user_email
        },{
            $set:{Password: body.password}
        });
        res.redirect('/login');
    } catch (err) {
        console.log('Error:', err);
        res.render("password_reset", { error: "An error occurred while setting your password. Please try again." });
    }
}
module.exports={
    get_forgetpassword,
    post_forgetpassword,
    get_passwordreset,
    post_submitpassword
}