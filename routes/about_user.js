const express = require("express");
const router = express.Router();
const User = require("../models/patient_details");

function calculateBMI(weight, height) {
    let w = parseFloat(weight);
    let h = parseFloat(height);

    // Log the values to debug
    console.log("Weight:", w, "Height:", h);

    if (isNaN(w) || isNaN(h) || h === 0) {
        // If weight or height is invalid or height is zero, return NaN or handle appropriately
        console.log("Invalid input");
    }

    let bmi = w / (h * h);
    return bmi.toFixed(2); // Ensure two decimal places
}

router.get("/", async (req, res) => {
    res.render("about");
});

router.post("/", async (req, res) => {
    const body = req.body;
    
    // Set default value for Pain_Area if it's missing
    const painArea = body.pain_area || 'Not specified';

    try {
    
        const newUser = await User.create({
            Email: req.cookies.userEmail,
            Name: body.name,
            Age: body.age,
            Gender: body.gender,
            Prev_Workout_Exp: body.Prev_Workout_Exp,
            BMI: calculateBMI(body.weight, body.height),
            Pain_Area: painArea, // Ensure a value is assigned
            Profession: body.profession,
            Activity_time: body.activity_time,
        });

        // Redirect to index.js after a successful user creation
        res.redirect("/index"); // Adjust the path to match your actual index page route
    } catch (err) {
        // Show the error message on the same page if an error occurs
        res.render("about", {
            errorMessage: "Error creating user: " + err.message,
        });
    }
});

module.exports = router;
