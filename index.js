const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express()
const cors= require('cors')
const ObjectId=require('mongodb').ObjectId
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.ffgwy.mongodb.net:27017,cluster0-shard-00-01.ffgwy.mongodb.net:27017,cluster0-shard-00-02.ffgwy.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-skeod6-shard-0&authSource=admin&retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
      await client.connect();
      const database = client.db("Emarket");
      const productsCollection = database.collection("products");
      const ordersCollection=database.collection("orders")
      const usersCollection=database.collection("users")
      // query for movies that have a runtime less than 15 minutes
      
      app.get('/products', async(req,res)=>{
        const cursor=productsCollection.find({})
        const result= await cursor.toArray()
        res.send(result)
    })

    app.post('/products', async(req,res)=>{
      const product = req.body;
      const result = await productsCollection.insertOne(product)
      res.json(result)
  })

    app.get('/products/:id',async(req,res)=>{
      const id=req.params.id
      const query={ _id: ObjectId(id) }

      const result=await productsCollection.findOne(query)
      res.send(result)
    })

    //  getting product by category api
    app.get('/productbycategory',async(req,res)=>{
      const category=req.query.category
      const query={category:category}
      const cursor = productsCollection.find(query)
      const result=await cursor.toArray()
      res.send(result)
    })


     // deleteBikesAPi
     app.delete('/products/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await productsCollection.deleteOne(query)
      res.json(result)
    })


    // post order api

    app.post('/orders', async (req, res) => {
      const order = req.body;
      const result = await ordersCollection.insertOne(order)

      res.send(result)
      
   
    })

    app.get('/orders', async (req, res) => {
      const email = req.query.email;
      
      const query={email:email}
      const cursor =  ordersCollection.find(query)
      const result= await cursor.toArray()
      console.log(result)

      res.send(result)
      
   
    })

    app.get('/totalorder',async(req,res)=>{
      const cursor=ordersCollection.find({})
      const result= await cursor.toArray()
      res.send(result)
    })



    app.put('/orders/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: ObjectId(id) }
      const doc = req.body
      const updateDoc = { $set: doc }
      const result = await ordersCollection.updateOne(filter, updateDoc)
      
    })


    app.delete('/orders/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: ObjectId(id) }

      const result = await ordersCollection.deleteOne(filter)
      console.log(result)
    })


    app.put('/saveuser',async(req,res)=>{
      const user = req.body;
        console.log(user)
        const filter = { email: user.email }
        const options = { upsert: true }
        const updateDoc = { $set: user }
        const result = await usersCollection.updateOne(filter, updateDoc, options);
        res.send(result);
    })

    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      const filter = { email }
      const result = await usersCollection.findOne(filter)
      let isAdmin = false;
      if (result?.role == 'admin') {
        isAdmin = true
      }
      res.json({ admin: isAdmin })
    })

    app.put('/users/admin',  async (req, res) => {
      const email = req.body
      const filter = { email: email.email };
     
     
       
          const updateDoc={
            $set:{
              role:'admin'
            }
          }

          const result= await usersCollection.updateOne(filter,updateDoc)
          res.json(result)
        
        })


    } finally {
    //   await client.close();
    }
  }


 
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('server activated')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})