const express = require("express")
const db = require("./db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const blog = require("./Routes/blogs")
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")

const userModel = require("./Models/userModel")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000 

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))//Accessing forms in the req variable
app.use(methodOverride("_method"))
app.use(cookieParser())

app.use(express.json())
db.connectToMongoDB()

app.use("/blogs", blog)

app.get("/", (req, res) =>{
  res.render("index")
})

app.get("/login", (req, res)=>{
  res.render("login")
  res.status(200)
})
app.post("/login", async (req, res)=>{
    try{
      const user = await userModel.findOne({email: req.body.email})
      // console.log(req.body.password)
      if( await bcrypt.compare(req.body.password, user.password.toString())){
        const accessToken = jwt.sign(user.password, process.env.ACCESS_SECRET)
        res.cookie("token", accessToken)
        console.log(accessToken)
        res.redirect("/blogs")
        res.status(200)
    }
    }catch{
      res.redirect("/login")
      console.log("error there was one")
    }
})

app.get("/register", (req, res)=>{
  res.render('register')
})
app.post("/register", async (req, res)=>{
 try{
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  await userModel.create({
    email: req.body.email,
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    password: hashedPassword
  })
  
  res.redirect("/login")
  res.status(200)
 
 }catch{
  res.redirect("/register")
 }
})

//Server listener
app.listen(PORT, ()=>{
  // console.log(`The server is running at port: ${PORT}`)
})

module.exports = app

