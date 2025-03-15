const User = require("../models/user");

const { generateOTP, SendOTP } = require("../otp/otp");
async function generateotp(req,res){
    const email = req.email;
    if (!email) {
        return res.status(400).json({ success: false, message: "Email not found in session." });
    }
    const otp = generateOTP(); 
    try {
        console.log(otp)
        await SendOTP(email, otp); 
        req.session.otp = otp;
        res.json({ success: true, message: "OTP sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send OTP." });
    }
}
async function submit_otp(req,res){
    const body = req.body;
    const otp_by_user = body.otp;

    if (otp_by_user == req.session.otp) {
        res.render("password_sign"); // Proceed to the password sign page if OTP is correct
    } else {
        // Pass otpMessage to the view in case of an invalid OTP
        res.render("otp", { otpMessage: "Invalid OTP!" });
    }
}
module.exports={
    generateotp,submit_otp
}