const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

// db Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tcfxjaz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const db = client.db("moon-tech");
const userCollection = db.collection("user");

router.route("/singup").post(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = { email, password };
    const result = userCollection.insertOne(user);
    // generate a JWT token and send it to the client
    const token = jwt.sign({ user }, process.env.TOKEN, {
      expiresIn: "3h",
    });
    res.send({ status: true, data: result, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.route("/login").post(async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    // generate a JWT token and send it to the client
    const token = jwt.sign({ user }, process.env.TOKEN, {
      expiresIn: "3h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
