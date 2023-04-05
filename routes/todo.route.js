const express = require("express");
const router = express.Router();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { authMiddleware } = require("../middleware/authoraization.middleware");

// db Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tcfxjaz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const db = client.db("moon-tech");
const todoCollection = db.collection("todos");
router
  .route("/")
  .get(authMiddleware, async (req, res) => {
    const cursor = todoCollection.find({});
    const todos = await cursor.toArray();
    res.send({ status: true, data: todos });
  })
  .post(authMiddleware, async (req, res) => {
    const todo = req.body;
    const result = await todoCollection.insertOne(todo);
    res.send({ status: true, data: result });
  });

/*
dynamic operation for todo
  */

router
  .route("/:id")
  .patch(authMiddleware, async (req, res) => {
    const id = req.params.id;
    const todo = req.body;
    const result = await todoCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: todo }
    );
    res.send({ status: true, data: result });
  })
  .delete(authMiddleware, async (req, res) => {
    const id = req.params.id;
    const result = await todoCollection.deleteOne({ _id: ObjectId(id) });
    res.send({ status: true, data: result });
  })
  .put(authMiddleware, async (req, res) => {
    try {
      const id = req.params.id;
      const updatedTodo = await todoCollection.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: req.body },
        { returnOriginal: false }
      );
      res.json(updatedTodo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
