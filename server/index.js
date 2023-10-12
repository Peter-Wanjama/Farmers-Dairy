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

// const mongoose=require('mongoose')

var app =require("./server.js")
var mongodb =require("mongodb")
require('dotenv').config()

const MongoClient=mongodb.MongoClient
const mongo_username=process.env.DB_USER
const mongo_password=process.env.DB_PASSWORD
const mongo_dbname=process.env.DB_DATABASE

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@mongocluster.n6mavag.mongodb.net/?retryWrites=true&w=majority/${mongo_dbname}`

const port=process.env.PORT

// mongoose.connect(uri,{})
//         .then(result=>console.log("database connected"))
//         .catch(err=>console.error("ERROR OCCURED:",err))


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

// app.listen(port,()=>{ console.log(`listening on port ${port}`)})