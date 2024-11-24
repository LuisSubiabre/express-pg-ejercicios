const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'plan_de_viajes',
    allowExitOnIdle: true
});


const agregarEquipamiento = async(nombre) => {
    const consulta = "INSERT INTO equipamiento VALUES (DEFAULT, $1)";
    const values = [nombre];
    const result = await pool.query(consulta, values);
    console.log("Equipamiento agregado");
}

const mostrarEquipamiento = async() => {
    const { rows } = await pool.query('SELECT * FROM equipamiento');
    console.log(rows);
    return rows;
}
//mostrarEquipamiento();
//agregarEquipamiento('Carpas');
module.exports = {agregarEquipamiento, mostrarEquipamiento};