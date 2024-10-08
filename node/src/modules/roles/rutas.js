const express = require('express')
const respuesta = require('../../red/respuestas')
const controller = require('./index')

const router = express.Router()

router.get('/', todos)
router.get('/:id', uno)
router.post('/register', agregar)

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

async function agregar (req, res, next) {
  try {
    const items = await controller.agregar(req.body)
    const msj = req.body.id === 0 || null ? 'Rol registrado con éxito' : 'Rol actualizado con éxito'
    respuesta.success(req, res, msj, 201)
  } catch (error) {
    next(error)
  }
}

module.exports = router
