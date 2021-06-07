const { ObjectId } = require('bson')
const { getDatabase } = require('../config/mongodb')

class Movie {

    static find() {
        return getDatabase().collection('movies').find().toArray()
    }

    static findOne(id) {
        return getDatabase().collection('movies').findOne({
            _id: ObjectId(id)
        })
    }

    static addOne(newMovie) {
        return getDatabase().collection('movies').insertOne(newMovie)
    }

    static editMovie(id, newData) {
        return getDatabase().collection('movies').replaceOne({
            _id: ObjectId(id)
        }, newData )
    }

    static deleteMovie(id) {
        return getDatabase().collection('movies').deleteOne({
            _id: ObjectId(id)
        })
    }
}

module.exports = Movie