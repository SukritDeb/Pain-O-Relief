const User = require("../models/patient_details");
async function get_dashboard(req,res){
    const email=req.user;
    const user = await User.findOne({ Email: email });
    return res.render("dashboard.ejs",{user});
}
module.exports={get_dashboard};