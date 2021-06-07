const express = require('express')
const movieRouter = express.Router()
const MovieController = require('../controllers/movieController');

movieRouter.get('/', MovieController.findAll)
movieRouter.post('/', MovieController.newMovie)
movieRouter.get('/:id', MovieController.movieDetail)
movieRouter.put('/:id', MovieController.editMovie)
movieRouter.delete('/:id', MovieController.deleteMovie)

module.exports = movieRouter