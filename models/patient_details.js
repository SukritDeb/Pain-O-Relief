const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Name: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
       
    },
    Prev_Workout_Exp: {
        type: String,
        required: true,

    },
    BMI: {
        type: String,
        required: true,
    },
    Pain_Area: {
        type: String,
        required: true,
    },
    Profession: {
        type: String,
        required: true,
    },
    Activity_time: {
        type: Number,
        required: true,
    }
});

const User = mongoose.model("patient_about", userSchema);
module.exports = User;
