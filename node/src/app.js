const express = require('express')
const cors = require('cors')
const config = require('./config')
const morgan = require('morgan')

const users = require('./modules/users/rutas')
const tasks = require('./modules/tasks/rutas')
const roles = require('./modules/roles/rutas')
const error = require('./red/errors')

const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// configuracion
app.set('port', config.app.port)

// rutas
app.use('/api/users', users)
app.use('/api/tasks', tasks)
app.use('/api/roles', roles)
app.use(error)

module.exports = app
