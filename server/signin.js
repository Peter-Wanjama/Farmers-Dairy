const express =require("express")
const bodyParser=require("body-parser")
const DbCtl = require("./database.controller");

const router=express.Router();

router.use(bodyParser.json());
router.use(express.static('public'));
router.use(bodyParser.urlencoded({
    extended: true
}));
 
router.route("/").post(DbCtl.getUser)

module.exports= router