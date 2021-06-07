const { ObjectId } = require('bson')
const { getDatabase } = require('../config/mongodb')

class Series {

    static find() {
        return getDatabase().collection('series').find().toArray()
    }

    static findOne(id) {
        return getDatabase().collection('series').findOne({
            _id: ObjectId(id)
        })
    }

    static addOne(newSeries) {
        return getDatabase().collection('series').insertOne(newSeries)
    }

    static editSeries(id, newData) {
        return getDatabase().collection('series').replaceOne({
            _id: ObjectId(id)
        }, newData )
    }

    static deleteSeries(id) {
        return getDatabase().collection('series').deleteOne({
            _id: ObjectId(id)
        })
    }
}

module.exports = Series