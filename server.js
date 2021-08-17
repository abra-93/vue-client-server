require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const { routes } = require("./routes/index");
const app = express();

const PORT = 5000;

try {
  let mdb = mongoose
    .connect(process.env.DB_URL, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((res) => console.log("connect"))
    .catch((error) => console.log(error));

  app.use(cors());

  app.use(express.static(path.join(__dirname, "post-images")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  routes.forEach((item) => {
    app.use("/api/", require(`./routes/${item}`));
  });

  app.listen(PORT, () => {
    console.log("Server started: " + process.env.PORT);
  });
} catch (error) {
  console.log(error);
}
