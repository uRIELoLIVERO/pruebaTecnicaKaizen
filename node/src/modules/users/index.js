//constructor para injeccion bd

const bd = require('../../BD/mysql')
const ctrl = require('./controller')

module.exports = ctrl(bd)