var express =require("express")
var cors =require("cors")
var reviews =require("./reviews.js")
var signup =require("./signup.js")
var signin =require("./signin.js")

const app=express()

app.use(cors())
app.use(express.json())
app.use('/reviews',reviews)
app.use("/signup",signup)
app.use("/signin",signin)
app.use("*",(req,res)=>
res.status(404).json({error:"not found"}))

 module.exports= app