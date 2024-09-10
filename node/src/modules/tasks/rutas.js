const express = require('express')
const { authenticateToken } = require('../../middleware/verificacion')
const autorizacion = require('../../middleware/autorizacion')
const respuesta = require('../../red/respuestas')
const controller = require('./index')
const router = express.Router()

// Rutas para usuarios autenticados
router.get('/my-tasks', authenticateToken(), autorizacion('list_own_tasks'), misTareas)
router.post('/', authenticateToken(), autorizacion('create_own_task'), agregar)
router.put('/my-tasks/update', authenticateToken(), autorizacion('update_own_task'), actualizar)
router.put('/my-tasks', authenticateToken(), autorizacion('delete_own_task'), eliminarPropia)

// Rutas para administradores
router.get('/all-tasks', authenticateToken(), autorizacion('list_all_tasks'), todos)
router.get('/tasks/:id', authenticateToken(), autorizacion('read_any_task'), uno)
router.put('/tasks/:id', authenticateToken(), autorizacion('delete_any_task'), eliminar)
router.put('/tasks/:id/recover', authenticateToken(), autorizacion('update_any_task'), recuperar)
router.put('/tasks/:id/status', authenticateToken(), autorizacion('update_any_task'), cambiarEstado)

// Funciones de manejo
async function misTareas (req, res, next) {
  try {
    const items = await controller.misTareas(req.user)
    respuesta.success(req, res, items, 200)
  } catch (error) {
    next(error)
  }
}

async function todos (req, res, next) {
  try {
    const items = await controller.todos()
    respuesta.success(req, res, items, 200)
  } catch (error) {
    next(error)
  }
}

async function uno (req, res, next) {
  try {
    const items = await controller.uno(req.params.id)
    respuesta.success(req, res, items, 200)
  } catch (error) {
    next(error)
  }
}

async function eliminar (req, res, next) {
  try {
    await controller.eliminar(req.params.id)
    respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200)
  } catch (error) {
    next(error)
  }
}

async function eliminarPropia (req, res, next) {
  try {
    const { id } = req.body
    await controller.eliminarPropia(id)
    respuesta.success(req, res, 'Tarea eliminada satisfactoriamente', 200)
  } catch (error) {
    next(error)
  }
}

async function recuperar (req, res, next) {
  try {
    await controller.recuperar(req.params.id)
    respuesta.success(req, res, 'Item recuperado satisfactoriamente', 200)
  } catch (error) {
    next(error)
  }
}

async function agregar (req, res, next) {
  try {
    const items = await controller.agregar(req.body, req.user)
    respuesta.success(req, res, 'Tarea registrada con éxito', 201)
  } catch (error) {
    next(error)
  }
}

async function actualizar (req, res, next) {
  try {
    const { id, status } = req.body
    await controller.actualizar(id, status)
    respuesta.success(req, res, 'Tarea actualizada con éxito', 200)
  } catch (error) {
    next(error)
  }
}

async function cambiarEstado (req, res, next) {
  try {
    const tarea = await controller.cambiarEstado(req.params.id, req.body.nuevoEstado)
    respuesta.success(req, res, tarea, 200)
  } catch (error) {
    next(error)
  }
}

module.exports = router
