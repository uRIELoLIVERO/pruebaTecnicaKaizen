module.exports = function (bdInyectada) {
  let db = bdInyectada
  if (!db) {
    db = require('../../BD/mysql')
  }
  const TABLA = db.Task

  async function misTareas (user) {
    return db.findAllForId(TABLA, user.id)
  }

  async function miTarea (id, user) {
    const tarea = await db.findOne(TABLA, id)
    if (tarea.user_id !== user.id) {
      throw new Error('No tienes permiso para ver esta tarea')
    }
    return tarea
  }

  async function todos () {
    return db.findAll(TABLA)
  }

  async function uno (id) {
    return db.findOne(TABLA, id)
  }

  async function eliminar (id) {
    return db.delete_(TABLA, id)
  }

  async function eliminarPropia (id) {
    return db.delete_(TABLA, id)
  }

  async function recuperar (id) {
    return db.recover(TABLA, id)
  }

  async function agregar (body, user) {
    const taskData = {
      ...body,
      user_id: user.id
    }
    return db.add(TABLA, taskData)
  }

  async function actualizar (id, status) {
    const data = { id, status }
    return db.add(TABLA, data)
  }

  async function cambiarEstado (idTarea, nuevoEstado) {
    const tarea = await uno(idTarea)
    if (!tarea) throw new Error('Tarea no encontrada')
    tarea.status = nuevoEstado
    await tarea.save()
    return tarea
  }

  return {
    misTareas,
    miTarea,
    todos,
    uno,
    eliminar,
    eliminarPropia,
    recuperar,
    agregar,
    actualizar,
    cambiarEstado
  }
}
