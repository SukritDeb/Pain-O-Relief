const express = require("express");
const router = express.Router();
const {jwtAuthMiddleware, generateToken} = require('./../auth');
const {get_dashboard} = require("../controller/user_dashboard");
router.get("/",jwtAuthMiddleware,get_dashboard);
module.exports = router;