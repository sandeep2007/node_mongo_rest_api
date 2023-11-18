require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes);

//ROUTES
app.get("/", (req, res) => {
  res.send("NodeJS");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("DB Connected");
});

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});
