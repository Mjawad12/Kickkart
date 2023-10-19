const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const mongoose = require("mongoose");
const cors = require("cors");
const Shoes = require("./Routes/Shoes");
const users = require("./Routes/Users");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("launched /");
});
app.use("/Shoes", Shoes);
app.use("/users", users);
mongoose
  .connect(process.env.Connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  })
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT || 5000, (req, res) => {
      console.log("app launched on port :" + 5000);
    });
  })
  .catch((error) => {
    console.log(error.message);
    console.log("could not connect");
  });
