// const { MongoClient } = require("mongodb");

// // Connection URI
// const uri = "mongodb+srv://admin:admin@flutterapi.jqkrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// // Create a new MongoClient
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();

//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


const mongoose = require('mongoose');
const credentials = require('./credentials')

const connectionString = (process.env.NODE_ENV === 'production') ? 
    credentials.mongo.production.connectionString : credentials.mongo.development.connectionString;

mongoose.connect(connectionString)
const db = mongoose.connection

db.on('error', err => {
    console.error('MongoDB error: ' + err.message)
    process.exit(1)
})
db.once('open', () => console.log('MongoDB connection established at '+connectionString))
