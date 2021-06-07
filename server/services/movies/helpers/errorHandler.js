function errorHandler(err, req, res, next) {
    switch (err.name) {
        case "Not Found":
            res.status(404).json( { message: ["Movie Not Found"] } )
            break
        case "Delete Failed":
            res.status(400).json({ message: ["Unable to Delete Movie"] })
            break
        case "Edit Failed":
            res.status(400).json({ message: ["Unable to Edit Movie"] })
            break
        default:
            res.status(err.status || 500).json( { message: [err.message] || ["Internal Server Error"] } )
            break;
    }
}

module.exports = errorHandler