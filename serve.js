const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

// const url="mongodb://localhost:27017"
const url="mongodb+srv://pndungu:Mongo123@mongocluster.n6mavag.mongodb.net/"
const port=8000
const app=express()

mongoose.connect(url,{})
        .then(result=>console.log("database connected"))
        .catch(err=>console.error("ERROR OCCURED:",err))

        

app.use(cors())
app.use(express.json())

app.use('/authenticate',(req,res)=>{
    //res.send('<h1>Server running</h1>');
    res.status(200).json({success: true, msg: "Show all users"});
})

app.use("*",(req,res)=>{
    res.status(404).json({error:"not found"});
    res.send("<h1 style=\"color:red;font-size:5em\">Error 404:Not Found</h1>");
})

app.listen(port,()=>{
    console.log("Server running at port ",port)
})