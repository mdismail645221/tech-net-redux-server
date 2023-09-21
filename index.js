const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config()
const jwt = require('jsonwebtoken');

// middleware
app.use(cors());
// app.use(express.static("public"));
app.use(express.json());


app.get('/', (req, res)=> {
    res.send('Hey, Your server successfully Run')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tech-net:T1T0QpsTqZNRuxHf@cluster0.yzc4fwf.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");




      const techNetAllProducts = client.db("tech-net").collection("product")





      app.get('/products', async(req, res)=> {
            const data = await techNetAllProducts.find({}).toArray();
            const result = await data;
           res.send(result)

      })










    } catch (error) {
      // Ensures that the client will close when you finish/error
      console.log({error})
    }
  }
  run().catch(console.dir);












app.listen(port, ()=> {
    console.log("tech net server is running", port, "Port")
})