const dotenv = require("dotenv");

dotenv.config();
const express=require("express")
const path=require("path")
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app=express()
const port=process.env.port
//routes
const userrouter=require("./routes/user")
const userdashboard=require("./routes/user_dashboard")
const signuprouter=require("./routes/signup")

const forgotpasswordrouter=require("./routes/forgotpassword")
const aboutuserrouter=require("./routes/about_user")
//connection
const connection=require("./connection")
connection.connectMongodb(process.env.MONGO_URL)
//views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//middlewires
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Secret key for signing cookies
app.use(
  session({
      secret: "Subha2003",
      resave: false,
      saveUninitialized: true,
  })
);

//routes
app.use("/",userrouter)
app.use("/signup",signuprouter)
app.use("/about",aboutuserrouter)
app.use("/forgotpassword",forgotpasswordrouter)
app.use("/dashboard",userdashboard)
//
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
