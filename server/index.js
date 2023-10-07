/* const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://pndungu:Mongo123@mongocluster.n6mavag.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir); */

import { User } from "../PRIVATE.js"
import app from "./server.js"
import mongodb from "mongodb"

const MongoClient=mongodb.MongoClient
const mongo_username=User.MONGO_USERNAME
const mongo_password=User.MONGO_PASSWORD

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@mongocluster.n6mavag.mongodb.net/?retryWrites=true&w=majority`

const port=8000

MongoClient.connect(
    uri,
    {
        maxPoolSize:50,
        wtimeoutMS:2500,
        useNewUrlParser:true
    }).catch(err=>{console.error(err.stack);process.exit(1)})
    .then(async client=>{
        app.listen(port,()=>{
        console.log(`listening on port ${port}`)})
    })
