function error (message, code) {
  const err = new Error(message)

  code ? err.statusCode = code : err.statusCode = ''

  return err
}

module.exports = error
