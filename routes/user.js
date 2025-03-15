const express=require("express")
const router=express.Router();
const {jwtAuthMiddleware} = require('./../auth');
const { get_user,
    get_index,
    get_login,
    post_login,
    video,
    logoutuser} = require("../controller/user");
router.get("/",get_user);
router.get("/index",jwtAuthMiddleware,get_index);
router.get("/login",get_login);
router.get("/video",video);
router.post("/login",post_login);
router.get("/logout",logoutuser);
module.exports = router;