const jwt = require('jsonwebtoken');
const jwtAuthMiddleware = (req, res, next) => {
    const token = req.cookies?.auth_token;
    if(!token){
        return res.redirect("/login");
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next();
    }catch(err){
        console.error("the error is: ",err);
        return res.redirect("/login");
    }
}
// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}
module.exports = {jwtAuthMiddleware, generateToken};