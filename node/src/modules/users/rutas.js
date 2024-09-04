const express = require('express')


const respuesta = require('../../red/respuestas')
const controller = require('./index')

const router = express.Router()

router.get('/', todos)
router.get('/:id', uno)
router.put('/:id', eliminar)
router.put('/recuperar/:id', recuperar)
router.post('/', agregar)

async function todos(req, res, next){
    try {
        const items = await controller.todos()
        respuesta.success(req, res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function uno(req, res, next){
    try {
        const items = await controller.uno(req.params.id)
        respuesta.success(req, res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function eliminar(req, res, next){
    try {
        const items = await controller.eliminar(req.params.id)
        respuesta.success(req, res, 'Item eliminado satisfactoriamente', 200)
    } catch (error) {
        next(error)
    }
}

async function recuperar(req, res, next) {
    try {
        const items = await controller.recuperar(req.params.id)
        respuesta.success(req, res, 'Item recuperado satisfactoriamente', 200)
    } catch (error) {
        next(error)
    }
}

async function agregar(req, res, next) {
    try {
        const items = await controller.agregar(req.body)
        req.body.id == 0 ? msj = 'Item guardado con exito' : msj = 'Item actualizado con exito'
        respuesta.success(req, res, msj, 201)
    } catch (error) {
        next(error)
    }
}
module.exports = router