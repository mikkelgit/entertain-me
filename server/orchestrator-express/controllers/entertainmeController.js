const axios = require('axios')
const movieServiceUrl = 'http://localhost:4001/movies'
const seriesServiceUrl = 'http://localhost:4002/series'
const Redis = require("ioredis")
const redis = new Redis()

const redisMovieKey = 'movieData'
const redisSeriesKey = 'seriesData'

class EntertainMeController {
    static async getMovieAndSeries (req, res, next) {
        try {
            let movieData = await redis.get(redisMovieKey)
            let seriesData = await redis.get(redisSeriesKey)
            if (!movieData || !seriesData) {
                const movie = await axios({
                    url: movieServiceUrl,
                    method: 'GET'
                })

                const series = await axios({
                    url: seriesServiceUrl,
                    method: 'GET'
                })

                const entertainmeData = {
                    movies: movie.data,
                    tvSeries: series.data
                }

                redis.set(redisMovieKey, JSON.stringify(movie.data))
                redis.set(redisSeriesKey, JSON.stringify(series.data))

                res.status(200).json(entertainmeData)
            } else {
                const entertainmeData = {
                    movies: JSON.parse(movieData),
                    tvSeries: JSON.parse(seriesData)
                }
                res.status(200).json(entertainmeData)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = EntertainMeController