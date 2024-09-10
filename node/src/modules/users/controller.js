const bcrypt = require('bcrypt')
const auth = require('../../auth/index')

module.exports = function (bdInyectada) {
  let db = bdInyectada
  if (!db) {
    db = require('../../BD/mysql') // por si no se inyecta correctamente
  }
  const TABLA = db.User

  async function login (email, password) {
    const user = await db.query(TABLA, { email })
    console.log(user)
    if (!user) throw new Error('Usuario no encontrado')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Informacion incorrecta')

    return auth.asignarToken({ id: user.id, email: user.email })
  }

  function todos () {
    return db.findAll(TABLA)
  }

  function uno (id) {
    return db.findOne(TABLA, id)
  }

  function eliminar (id) {
    return db.delete_(TABLA, id)
  }

  function recuperar (id) {
    return db.recover(TABLA, id)
  }

  async function agregar (body) {
    const userData = {
      ...body,
      role_id: 1
    }
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password.toString(), 10)
    }
    return db.add(TABLA, userData)
  }

  return {
    todos,
    uno,
    eliminar,
    recuperar,
    agregar,
    login
  }
}
