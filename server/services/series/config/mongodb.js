const { MongoClient } = require('mongodb')

let database = null

async function connect() {
    try {
        const uri = `mongodb+srv://prjData:${process.env.ATLAST_DB_PASS}@seriescluster.ei3f5.mongodb.net/SeriesCluster?retryWrites=true&w=majority`
        const client = new MongoClient(uri, {
            useUnifiedTopology: true
        })
        await client.connect()
        database = client.db('entertain_me_db')
    } catch (error) {
        console.log(error)
    }
}

function getDatabase () {
    return database
}

module.exports = {
    connect,
    getDatabase
}