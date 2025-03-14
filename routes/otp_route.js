const express=require("express")
const router=express.Router();
const {generateotp,submit_otp} = require("../controller/otp_route");
router.post("/generate_otp",generateotp);
router.post("/submit_otp", submit_otp);
module.exports=router;