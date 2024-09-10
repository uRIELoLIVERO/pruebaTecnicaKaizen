module.exports = function (bdInyectada) {
  let db = bdInyectada
  if (!db) {
    db = require('../../BD/mysql') // por si no se inyecta correctamente
  }
  const TABLA = db.Role

  function todos () {
    return db.findAll(TABLA)
  }

  function uno (id) {
    return db.findOne(TABLA, id)
  }

  async function agregar (body) {
    return db.add(TABLA, body)
  }

  return {
    todos,
    uno,
    agregar
  }
}
