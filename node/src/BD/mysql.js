const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host : config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig)

    conexion.connect((err) => {
        if(err){
            console.log('[db err]', err)
            setTimeout(conMysql, 200)
        } else {
            console.log('DB conectada')
        }
    })

    conexion.on('error', err =>{
        console.log('[db err]', err)
        if (err.code === `PROTOCOL_CONNECTION_LOST`){
            conMysql()
        } else {
            throw new err;
        }
    })
}

conMysql()

function todos(tabla){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE is_deleted = FALSE`, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function uno(tabla, id){
    return new Promise( (resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

function eliminar(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET is_deleted = TRUE WHERE id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function recuperar(tabla, id){
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET is_deleted = FALSE WHERE id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function agregar(tabla, data){
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}


module.exports = {
    todos,
    uno,
    eliminar,
    recuperar,
    agregar,
}