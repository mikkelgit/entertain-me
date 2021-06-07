function errorHandler(err, req, res, next) {
    switch (err.name) {
        case "Not Found":
            res.status(404).json( { message: ["Series Not Found"] } )
            break
        case "Delete Failed":
            res.status(400).json({ message: ["Unable to Delete Series"] })
            break
        case "Edit Failed":
            res.status(400).json({ message: ["Unable to Edit Series"] })
            break
        default:
            res.status(err.status || 500).json( { message: [err.message] || ["Internal Server Error"] } )
            break;
    }
}

module.exports = errorHandler