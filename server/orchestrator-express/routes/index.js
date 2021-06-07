const express = require('express')
const EntertainMeController = require('../controllers/entertainmeController')
const movieRouter = require('./movieRouter')
const seriesRouter = require('./seriesRouter')
const router = express.Router()

router.get('/entertainme', EntertainMeController.getMovieAndSeries)

router.use('/movies', movieRouter)
router.use('/series', seriesRouter)

module.exports = router