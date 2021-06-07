const Movie = require('../models/movies')

class MovieController {
    static async findAll(req, res, next) {
        try {
            const movies = await Movie.find()
            res.status(200).json(movies)
        } catch (error) {
            next(error)
        }
    }

    static async movieDetail(req, res, next) {
        try {
            const movieFound = await Movie.findOne(req.params.id)
            if (movieFound === null) {
                res.status(404).json({ message: [ 'Movie Not Found' ] })
            } else {
                res.status(200).json(movieFound)
            }
        } catch (error) {
            next(error)
        }
    }

    static async newMovie(req, res, next) {
        try {
            const newMovie = req.body
            const movie = await Movie.addOne(newMovie)
            res.status(201).json(movie)
        } catch (error) {
            next(error)
        }
    }

    static async editMovie(req, res, next) {
        try {
            const movieFound = await Movie.findOne(req.params.id)
            if (movieFound === null) {
                res.status(404).json({ message: [ 'Movie Not Found' ] })
            } else {
                const newData = req.body
                const movie = await Movie.editMovie(req.params.id, newData)
                res.status(200).json(movie)
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteMovie(req, res, next) {
        try {
            const movieFound = await Movie.findOne(req.params.id)
            if (movieFound === null) {
                res.status(404).json({ message: [ 'Movie Not Found' ] })
            } else {
                const movie = await Movie.deleteMovie(req.params.id)
                res.status(200).json(movie)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MovieController