const express=require("express")
const { generateOTP, SendOTP } = require("../otp/otp");
const router=express.Router();
const User = require("../models/user");
router.post("/generate_otp", async (req, res) => {
    const email = req.cookies.userEmail;
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
});

router.post("/submit_otp", async (req, res) => {
    const body = req.body;
    const otp_by_user = body.otp;

    if (otp_by_user == req.session.otp) {
        res.render("password_sign"); // Proceed to the password sign page if OTP is correct
    } else {
        // Pass otpMessage to the view in case of an invalid OTP
        res.render("otp", { otpMessage: "Invalid OTP!" });
    }
});