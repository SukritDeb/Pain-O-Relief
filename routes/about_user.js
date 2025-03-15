const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware, generateToken} = require('./../auth');
const {get_about_page,user_profile} = require("../controller/about_user");
router.get("/",jwtAuthMiddleware,get_about_page);
router.post("/",jwtAuthMiddleware,user_profile);
module.exports = router;
