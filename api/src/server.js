const express = require("express");
const mongoose = require("mongoose");

const routerAdmin = require("./routes/routerAdmin");
const routerBasic = require("./routes/routerBasic");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(express.json());

app.use("/private", routerAdmin);
app.use("/", routerBasic);

app.listen(process.env.PORT || 3333, () => {
  console.log(`[running] started on http://localhost:${process.env.PORT}\n`);
});
