const express=require("express");
const router=express.Router();
const {get_forgetpassword,
    post_forgetpassword,
    get_passwordreset,
    post_submitpassword} = require("../controller/forgotpassword");
router.get("/",get_forgetpassword);
router.post("/",post_forgetpassword);
router.get("/password_reset",get_passwordreset);
router.post("/submit_password",post_submitpassword);
module.exports = router;