const { response } = require('express');
const express= require('express');
const debug = require('debug')('app:adminRouter');
const { MongoClient, ServerApiVersion } = require('mongodb');
const products = require('../../data/data.json');

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


const adminRouter = express.Router();

adminRouter.route('/').get((req,res)=>{
    const uri = "mongodb+srv://db_user:ePF5IunLyGikMKvH@cluster0.dfxgkak.mongodb.net?retryWrites=true&w=majority";

    const dbName = 'products';
    (async function mongo(){
        let client;

        try{

         client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

         const db = client.db(dbName);

         const response= await db.collection('Products').insertMany(products);
         res.json(response);

        }catch(err){
           debug(err.stack); 
        }
        client.close();
    })();
});

module.exports = adminRouter;