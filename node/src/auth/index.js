const jwt = require('jsonwebtoken')
const config = require('../config')

const secret = config.jwt.secret

function asignarToken (data) {
  return jwt.sign(data, secret, { expiresIn: '1h' })
}

function verificarToken (token) {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw new Error('Token inválido')
  }
}

const chequearToken = {
  confirmarToken: function (req) {
    const decodificado = decodificarCabecera(req)
    if (decodificado.id !== parseInt(req.params.id)) {
      throw new Error('No tienes acceso')
    }
  }
}

function obtenerToken (autorizacion) {
  if (!autorizacion) throw new Error('Token no enviado')

  if (autorizacion.indexOf('Bearer') === -1) throw new Error('Formato invalido')

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
