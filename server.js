const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
app.use(express.static(path.join(__dirname)));
app.use(cors());
app.use(express.json());
app.use(express());

app.use("/user", userRoutes);

const port = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
