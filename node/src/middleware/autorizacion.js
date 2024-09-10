const autorizacion = (permiso) => {
  return async (req, res, next) => {
    try {
      const user = req.user
      if (!user) {
        return res.status(401).json({ message: 'Usuario no autenticado' })
      }

      const tienePermiso = await user.hasPermission(permiso)

      if (tienePermiso) {
        next()
      } else {
        res.status(403).json({ message: 'No tienes permiso para realizar esta acción' })
      }
    } catch (error) {
      next(error)
    }
  }
}
module.exports = autorizacion
