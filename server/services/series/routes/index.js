const express = require('express')
const seriesRouter = require('./seriesRouter')
const router = express.Router()

router.use('/series', seriesRouter)

module.exports = router