function errorHandler(err, req, res, next) {
    switch (err.name) {
        default:
            res.status(err.status || 500).json( { message: [err.message] || ["Internal Server Error"] } )
            break;
    }
}

module.exports = errorHandler