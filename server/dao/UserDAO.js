const mongodb =require("mongodb")
const ObjectId=mongodb.ObjectId

let users
class UserDAO{
    static async injectDB(conn){
        if(users){
        return
        }
        try {
            // users=conn.db("mydb").conn.collection("farmers")
            users=conn.db("mydb").collection("farmers")
        } catch (e) {
            console.error(`Unable to connect to DB: ${e}`);
        }
    }
    static async addUser (user) {
        console.log("Received ",user)
    }
}
 
module.exports=UserDAO