const mongodb =require("mongodb")
const ObjectId=mongodb.ObjectId
const bcrypt = require("bcrypt");

let users
class UserDAO{
    static async injectDB(conn){
        if(users){
        return
        }
        try {
            users=conn.db("mydb").collection("farmers")
        } catch (e) {
            console.error(`Unable to connect to DB: ${e}`);
        }
    }
    static async addUser (user) {
        return await users.insertOne(user);
    }
    static async getUser (user) {
        const result= await users.findOne({username:user.username})
        if (await bcrypt.compare(user.password,result.password)) {
            return result;
        } else {
            return null;
        }
    }
}
 
module.exports = UserDAO