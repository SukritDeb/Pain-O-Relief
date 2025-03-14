const express = require("express");
const router = express.Router();
const {get_dashboard} = require("../controller/user_dashboard");
router.get("/",get_dashboard);
module.exports = router;