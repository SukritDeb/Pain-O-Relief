const User = require("../models/patient_details");

function calculateBMI(weight, height) {
    let w = parseFloat(weight);
    let h = parseFloat(height);
    console.log("Weight:", w, "Height:", h);
    if (isNaN(w) || isNaN(h) || h === 0) {
        console.log("Invalid input");
    }
    let bmi = w / (h * h);
    return bmi.toFixed(2); 
}
async function get_about_page(req,res){
    res.render("about");
}
async function user_profile(req,res){
    const body = req.body;
    const painArea = body.pain_area || 'Not specified';
    try {
    
        const newUser = await User.create({
            Email: req.user,
            Name: body.name,
            Age: body.age,
            Gender: body.gender,
            Prev_Workout_Exp: body.Prev_Workout_Exp,
            BMI: calculateBMI(body.weight, body.height),
            Pain_Area: painArea, 
            Profession: body.profession,
            Activity_time: body.activity_time,
        });

        
        res.redirect("/index"); 
    } catch (err) {
       
        res.render("about", {
            errorMessage: "Error creating user: " + err.message,
        });
    }
}
module.exports = {
    get_about_page,
    user_profile
};