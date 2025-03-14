const express=require("express")
const router=express.Router();
const { get_user,
    get_index,
    get_login,
    post_login,
    video} = require("../controller/user");
router.get("/",get_user);
router.get("/index",get_index);
router.get("/login",get_login);
router.get("/video",video);
router.post("/login",post_login);
module.exports = router;