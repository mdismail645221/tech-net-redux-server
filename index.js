require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://tech-net:T1T0QpsTqZNRuxHf@cluster0.yzc4fwf.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
    try {
      const db = client.db('tech-net');
      const techNetAllProducts = db.collection("product")

      app.get('/products', async(req, res)=> {
            const data = await techNetAllProducts.find({}).toArray();
            const result = await data;
           res.send(result)

      })

      app.get('/product/:id', async (req, res) => {
        const id = req.params.id;
        const result = await techNetAllProducts.findOne({ _id: ObjectId.createFromHexString(id) });
        console.log(result);
        res.send(result);
      });

    } catch (error) {
      // Ensures that the client will close when you finish/error
      console.log({error})
    }
  }
  run().catch(console.dir)


  app.get('/', (req, res)=> {
    res.send('Hey, Your server successfully Run')
})

app.listen(port, ()=> {
    console.log("tech net server is running", port, "Port")
})