const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || 3333, () => {
  console.log(`[running] started on http://localhost:${process.env.PORT}\n`)
})

