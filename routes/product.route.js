const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// db Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tcfxjaz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const db = client.db("moon-tech");
const productCollection = db.collection("products");

router.route("/").get(async (req, res) => {
  const cursor = productCollection.find({});
  const product = await cursor.toArray();

  res.send({ status: true, data: product });
});

module.exports = router;
