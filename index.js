require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const todoRoutes = require("./routes/todo.route");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");

// cors & middleware
app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://todo-list-bice-ten.vercel.app/"],
  })
);

// routes
app.use("/todo", todoRoutes);
app.use("/", userRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
