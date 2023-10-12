const express =require("express")
const bodyParser=require("body-parser")
const bcrypt = require("bcrypt");
const DbCtl = require("./database.controller");

const router=express.Router();

router.use(bodyParser.json());
router.use(express.static('public'));
router.use(bodyParser.urlencoded({
    extended: true
}));
 

// router.route("/").post(async(req,res)=>{
//     var new_user={};
//     new_user.username=req.body.username;
//     new_user.phone=req.body.phone;
//     new_user.password=await bcrypt.hash(req.body.password,10);
//     res.status(200).json({success:"signup successful",new_user})
//     console.log(new_user)
// })
router.route("/").post(DbCtl.postUser)

module.exports= router