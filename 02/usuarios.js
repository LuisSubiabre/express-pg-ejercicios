//CREATE TABLE usuarios (id SERIAL, email VARCHAR(150), password VARCHAR(150));


const { Pool } = require('pg');


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'plan_de_viajes',
    allowExitOnIdle: true
});

/*
const obtenerUsuarios = async () => {
    const { rows} = await pool.query('SELECT * FROM usuarios');
    console.log(rows);
    return rows;
};*/


const agregarUsuario = async (email, password) => {
    const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2)";
    const values = [email, password];
    const result = await pool.query(consulta, values);
    console.log("Usuario agregado");
}

/* con SQL Injection */
//http://localhost:3002/usuarios/1 or 1=1 <-SQL INJECTION
const obtenerUsuarios = async (id) => {
    const consulta = `SELECT * FROM usuarios where id = ${id}`;
    const result = await pool.query(consulta);
    console.log(id);
    return result;
};

module.exports = {obtenerUsuarios, agregarUsuario};