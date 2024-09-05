const express = require('express');
const config = require('./config');
const morgan = require('morgan')

const users = require('./modules/users/rutas');
const error = require('./red/errors');

const app = express();


//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//configuracion
app.set('port', config.app.port);

//rutas
app.use('/api/users', users)
app.use(error)

module.exports = app