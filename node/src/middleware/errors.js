function error (message, code) {
    let err = new Error(message)

    code ? err.statusCode = code : ''

    return err
}

module.exports = error