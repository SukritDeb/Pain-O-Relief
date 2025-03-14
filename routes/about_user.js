const express = require("express");
const router = express.Router();
const {get_about_page,user_profile} = require("../controller/about_user");
router.get("/",get_about_page);
router.post("/",user_profile);
module.exports = router;
