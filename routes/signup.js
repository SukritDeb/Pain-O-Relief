const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET request for signup page
router.get("/", (req, res) => {
    const error = req.session.error || null;
    delete req.session.error; // Clear error after rendering
    res.render("signup", { error });
});

// Function to validate password strength
function validPassword(password) {
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[^a-zA-Z0-9]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    
    return hasNumbers && hasSpecialChars && hasUpperCase && hasLowerCase;
}

// POST request for signup form
router.post("/", async (req, res) => {
    const { email, password, confirm_Password } = req.body;

    try {
        const existingUser = await User.findOne({ Email: email });

        if (existingUser) {
            req.session.error = "User already exists! Try logging in...";
            return res.redirect("/signup");
        }

        if (!validPassword(password)) {
            req.session.error = "Password must contain at least one digit, one special character, one uppercase, and one lowercase letter.";
            return res.redirect("/signup");
        }

        if (password !== confirm_Password) {
            req.session.error = "Passwords do not match. Please try again.";
            return res.redirect("/signup");
        }

        await User.create({ Email: email, Password: password });
          // Set secure cookie with email
        res.cookie("userEmail", email, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });



        res.redirect("/about"); // Redirect to login after successful signup
    } catch (err) {
        console.error("Error:", err);
        req.session.error = "An error occurred while creating your account. Please try again.";
        res.redirect("/signup");
    }
});

module.exports = router;
