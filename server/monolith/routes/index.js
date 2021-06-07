const express = require('express')
const movieRouter = require('./movieRouter')
const seriesRouter = require('./seriesRouter')
const router = express.Router()

router.use('/movies', movieRouter)
router.use('/series', seriesRouter)

module.exports = router