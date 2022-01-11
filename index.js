const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express()
const cors= require('cors')
const ObjectId=require('mongodb').ObjectId
const port = 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ffgwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
      await client.connect();
      const database = client.db("Emarket");
      const productsCollection = database.collection("products");
      // query for movies that have a runtime less than 15 minutes
      
      app.get('/products', async(req,res)=>{
        const cursor=productsCollection.find({})
        const result= await cursor.toArray()
        res.send(result)
    })

    app.get('/products/:id',async(req,res)=>{
      const id=req.params.id
      const query={ _id: ObjectId(id) }

      const result=await productsCollection.findOne(query)
      res.send(result)
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