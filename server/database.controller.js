const UserDAO = require("./dao/UserDAO")
const bcrypt = require("bcrypt");
class DbCtl {
    static async postUser(req, res, next) {
        try {
            var new_user = {};
            new_user.username = req.body.username;
            new_user.phone = req.body.phone;
            new_user.password = await bcrypt.hash(req.body.password, 10);
            // new_user.password=req.body.password;
            // res.status(200).json({success:"signup successful",new_user})
            // console.log(new_user)
            const db_response = await UserDAO.addUser(new_user)
            console.log("database controller:", db_response)
            res.status(200).json({ success: "signup successful" })
        } catch (e) {
            console.error("Error occured:", e.message);
            res.status(500).json({ error: e.message })
        }
    }
    static async getUser(req, res, next) {
        try {
            var user = {};
            user.username = req.body.username;
            // user.password=await bcrypt.hash(req.body.password,10);
            user.password = req.body.password;

            const db_response = await UserDAO.getUser(user)
            if (db_response) {
                res.status(200).json({ success: "signin successful" })
                console.log("database controller:", db_response)
            } else {
                res.status(500).json({ error: 'username or password incorrect' })
            }
        } catch (e) {
            console.error("Error occured:", e.message);
            res.status(500).json({ error: e.message })
        }
    }
}
module.exports = DbCtl
