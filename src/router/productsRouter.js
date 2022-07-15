const express= require('express');
const debug = require('debug')('app:productsRouter');
const { MongoClient, ServerApiVersion, ObjectID, ObjectId } = require('mongodb');

const productsRouter = express.Router();

productsRouter.route('/')
.get((req,res)=>{
    const uri = "mongodb+srv://db_user:ePF5IunLyGikMKvH@cluster0.dfxgkak.mongodb.net?retryWrites=true&w=majority";

    const dbName = 'products';
    (async function mongo(){
        let client;

        try{

         client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

         const db = client.db(dbName);

         const response= await db.collection('Products').find().toArray();
         res.render('products',{products:response});

        }catch(err){
           debug(err.stack); 
        }
        client.close();
    })();
});

productsRouter.route('/:id')
.get((req,res)=>{
    const id = req.params.id;
    // res.render('product', {Name:"hh",Description:"sdfsf",id:id});
    // //.send('Hello signle Products' + id);

    const uri = "mongodb+srv://db_user:ePF5IunLyGikMKvH@cluster0.dfxgkak.mongodb.net?retryWrites=true&w=majority";

    const dbName = 'products';
    (async function mongo(){
        let client;

        try{

         client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

         const db = client.db(dbName);

         const response= await db.collection('Products').findOne({_id: new ObjectId(id)});
         res.render('product',response);

        }catch(err){
           debug(err.stack); 
        }
        client.close();
    })();
});

module.exports = productsRouter;