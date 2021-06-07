const Series = require('../models/series')

class SeriesController {
    static async findAll(req, res, next) {
        try {
            const series = await Series.find()
            res.status(200).json(series)
        } catch (error) {
            next(error)
        }
    }

    static async seriesDetail(req, res, next) {
        try {
            const seriesFound = await Series.findOne(req.params.id)
            if (seriesFound === null) {
                next({ name: 'Not Found' })
            } else {
                res.status(200).json(seriesFound)
            }
        } catch (error) {
            next(error)
        }
    }

    static async newSeries(req, res, next) {
        try {
            const newSeries = req.body
            const series = await Series.addOne(newSeries)
            res.status(201).json(series.ops[0])
        } catch (error) {
            next(error)
        }
    }

    static async editSeries(req, res, next) {
        try {
            const seriesFound = await Series.findOne(req.params.id)
            if (seriesFound === null) {
                next({ name: 'Not Found' })
            } else {
                const newData = req.body
                const series = await Series.editSeries(req.params.id, newData)
                if (series.modifiedCount) {
                    res.status(200).json(series.ops[0])
                } else {
                    next({ name: 'Edit Failed' })
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteSeries(req, res, next) {
        try {
            const seriesFound = await Series.findOne(req.params.id)
            if (seriesFound === null) {
                next({ name: 'Not Found' })
            } else {
                const series = await Series.deleteSeries(req.params.id)
                if (series.deletedCount) {
                    res.status(200).json({ message: 'Series Deleted' })
                } else {
                    next({ name: 'Delete Failed' })
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = SeriesController