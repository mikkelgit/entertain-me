const axios = require('axios')
const baseUrl = 'http://localhost:4002/series'
const Redis = require("ioredis")
const redis = new Redis()
const redisKey = 'seriesData'

class SeriesController {
    static async findAll(req, res, next) {
        try {
            let result = await redis.get(redisKey)
            if (!result) {
                const { data } = await axios({
                    url: baseUrl,
                    method: 'GET'
                })
                redis.set(redisKey, JSON.stringify(data))
                res.status(200).json(data)
            } else {
                res.status(200).json(JSON.parse(result))
            }
        } catch (error) {
            next(error)
        }
    }

    static async seriesDetail(req, res, next) {
        try {
            const findSeries = await axios({
                url: baseUrl + `/${req.params.id}`,
                method: 'GET'
            })
            res.status(200).json(findSeries.data)
        } catch (error) {
            next(error)
        }
    }

    static async newSeries(req, res, next) {
        try {
            const { data } = await axios({
                url: baseUrl,
                method: 'POST',
                data: req.body
            })
            redis.del(redisKey)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async editSeries(req, res, next) {
        try {
            const { data } = await axios({
                url: baseUrl + `/${req.params.id}`,
                method: 'PUT',
                data: req.body
            })
            redis.del(redisKey)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteSeries(req, res, next) {
        try {
            const { data } = await axios({
                url: baseUrl + `/${req.params.id}`,
                method: 'DELETE'
            })
            redis.del(redisKey)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = SeriesController