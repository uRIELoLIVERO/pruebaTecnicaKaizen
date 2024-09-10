const express = require('express')
const { authenticateToken } = require('../../middleware/verificacion')
const respuesta = require('../../red/respuestas')
const controller = require('./index')

const router = express.Router()

router.get('/', todos)
router.get('/:id', uno)
router.put('/:id', authenticateToken(), eliminar)
router.put('/recuperar/:id', authenticateToken(), recuperar)
router.post('/register', agregar)
router.post('/login', login)

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
    const items = await controller.eliminar(req.params.id)
    respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200)
  } catch (error) {
    next(error)
  }
}

async function recuperar (req, res, next) {
  try {
    const items = await controller.recuperar(req.params.id)
    respuesta.success(req, res, 'Item recuperado satisfactoriamente', 200)
  } catch (error) {
    next(error)
  }
}

async function agregar (req, res, next) {
  try {
    const items = await controller.agregar(req.body)
    const msj = req.body.id === 0 || null ? 'Usuario registrado con éxito' : 'Usuario actualizado con éxito'
    respuesta.success(req, res, msj, 201)
  } catch (error) {
    next(error)
  }
}

async function login (req, res, next) {
  const { email, password } = req.body
  try {
    const result = await controller.login(email, password)
    respuesta.success(req, res, result, 200)
  } catch (error) {
    next(error)
  }
}

module.exports = router
