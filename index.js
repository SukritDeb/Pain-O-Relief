require("dotenv").config();
const express=require("express")
const path=require("path")
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app=express()
const port=4000
//routes
const userrouter=require("./routes/user")
const signuprouter=require("./routes/signup")

const forgotpasswordrouter=require("./routes/forgotpassword")
const aboutuserrouter=require("./routes/about_user")
//connection
const connection=require("./connection")
connection.connectMongodb('mongodb://127.0.0.1:27017/pain_o_relief')
//views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//middlewires
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SECRET_KEY || "Subhajit")); // Secret key for signing cookies
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
//
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
