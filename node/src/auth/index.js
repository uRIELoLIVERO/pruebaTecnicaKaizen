const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../middleware/errors')

const secret = config.jwt.secret

function asignarToken (data) {
  return jwt.sign(data, secret, { expiresIn: '1h' })
}

function verificarToken (token) {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw error('Token inválido', 401)
  }
}

const chequearToken = {
  confirmarToken: function (req, idParam) {
    const decodificado = decodificarCabecera(req)

    if (idParam !== undefined) {
      if (decodificado.id !== parseInt(idParam)) {
        throw error('No tienes acceso', 403)
      }
    }

    return decodificado
  }
}

function obtenerToken (autorizacion) {
  if (!autorizacion) throw error('Token no enviado', 401)
  if (autorizacion.indexOf('Bearer') === -1) throw error('Formato invalido', 401)
  const token = autorizacion.replace('Bearer ', '')
  return token
}

function decodificarCabecera (req) {
  const autorizacion = req.headers.authorization || ''
  const token = obtenerToken(autorizacion)
  const decodificado = verificarToken(token)
  req.user = decodificado
  return decodificado
}

module.exports = {
  asignarToken,
  chequearToken
}
