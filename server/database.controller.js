const UserDAO = require("./dao/UserDAO")

class DbCtl {
    static async postUser(req,res,next) {
        try {
            var new_user={};
            new_user.username=req.body.username;
            new_user.phone=req.body.phone;
            new_user.password=await bcrypt.hash(req.body.password,10);
            // res.status(200).json({success:"signup successful",new_user})
            // console.log(new_user)
            const db_response=await UserDAO.addUser(new_user)
            console.log("database controller:",db_response)
            res.json({status:'success'})
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }
}
module.exports=DbCtl
