const express = require('express')
const cors = require('cors');
const errorHandler = require('./helpers/errorHandler');
const router = require('./routes');
const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended: false } ))

app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Entertain Me app listening at http://localhost:${port}`)
})