const auth = require('../auth/index')
const { User, Role } = require('../BD/mysql')

function authenticateToken () {
  return async function middleware (req, res, next) {
    try {
      const id = req.params.id
      const decodificado = auth.chequearToken.confirmarToken(req, id)

      const user = await User.findByPk(decodificado.id, {
        include: [{ model: Role, attributes: ['permissions'] }]
      })

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
      }

      req.user = user
      next()
    } catch (err) {
      res.status(err.statusCode || 401).json({ error: err.message })
    }
  }
}

module.exports = {
  authenticateToken
}
