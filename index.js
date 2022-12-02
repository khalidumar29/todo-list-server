require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tcfxjaz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const db = client.db("moon-tech");
    const productCollection = db.collection("products");
    const todoCollection = db.collection("todos");

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();

      res.send({ status: true, data: product });
    });

    app.post("/todo", async (req, res) => {
      const todo = req.body;
      const result = await todoCollection.insertOne(todo);
      res.send({ status: true, data: result });
    });

    app.patch("/todo/:id", async (req, res) => {
      const id = req.params.id;
      const todo = req.body;
      const result = await todoCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: todo }
      );
      res.send({ status: true, data: result });
    });

    app.get("/todo", async (req, res) => {
      const cursor = todoCollection.find({});
      const todos = await cursor.toArray();
      res.send({ status: true, data: todos });
    });

    app.delete("/todo/:id", async (req, res) => {
      const id = req.params.id;
      const result = await todoCollection.deleteOne({ _id: ObjectId(id) });
      res.send({ status: true, data: result });
    });
  } finally {
  }
};

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
