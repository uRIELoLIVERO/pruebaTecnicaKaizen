const TABLA = 'users'

module.exports = function (bdInyectada){

    let db = bdInyectada

    if(!db){
        db = require('../../BD/mysql')
    }

    function todos () {
        return db.todos(TABLA)
    }
    
    function uno (id) {
        return db.uno(TABLA, id)
    }
    
    function eliminar (id){
        return db.eliminar(TABLA, id)
    }
    
    function recuperar (id){
        return db.recuperar(TABLA, id)
    }
    
    function agregar (body){
        return db.agregar(TABLA, body)
    }

    return {
        todos,
        uno,
        eliminar,
        recuperar,
        agregar
    }
}