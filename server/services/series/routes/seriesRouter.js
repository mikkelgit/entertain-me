const express = require('express')
const seriesRouter = express.Router()
const SeriesController = require('../controllers/seriesController');

seriesRouter.get('/', SeriesController.findAll)
seriesRouter.post('/', SeriesController.newSeries)
seriesRouter.get('/:id', SeriesController.seriesDetail)
seriesRouter.put('/:id', SeriesController.editSeries)
seriesRouter.delete('/:id', SeriesController.deleteSeries)

module.exports = seriesRouter