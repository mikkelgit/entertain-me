function errorHandler(err, req, res, next) {
    switch (err.response.status) {
        default:
            res.status(err.response.status || 500).json( { message: [err.response.data.message] || ["Internal Server Error"] } )
            break;
    }
}

module.exports = errorHandler