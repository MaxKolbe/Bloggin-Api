const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
require("dotenv").config()

app.use(cookieParser())

const authenticateToken = (req, res, next)=>{
  const token = req.cookies.token
  if(token){
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user)=>{
      if(err){
        console.log(err)
        res.redirect("/login")
      }else{
        next()
      }  
    })
  }else{
    console.log("There was no token")
    res.redirect("/login")
  }
}

function rando(){
 return Math.floor(Math.random() * 500)
}

module.exports = {
  authenticateToken,
  rando
}