const express = require('express')
const cors = require('cors');
const { connect } = require('./config/mongodb');
const router = require('./routes');
const errorHandler = require('./helpers/errorHandler');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: false } ))

app.use(router)
app.use(errorHandler)

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  })