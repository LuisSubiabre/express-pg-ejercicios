const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123",
  database: "plan_de_viajes",
  allowExitOnIdle: true,
});

const agregarEquipamiento = async (nombre) => {
  const consulta = "INSERT INTO equipamiento VALUES (DEFAULT, $1)";
  const values = [nombre];
  const result = await pool.query(consulta, values);
  console.log("Equipamiento agregado");
};

const mostrarEquipamiento = async () => {
  const { rows } = await pool.query("SELECT * FROM equipamiento");
  console.log(rows);
  return rows;
};

const modificarEquipamiento = async (nombre, id) => {
  console.log(nombre);
  const consulta = "UPDATE equipamiento SET nombre = $1 WHERE id = $2";
  const values = [nombre, id];
  const { rowCount } = await pool.query(consulta, values);
  if (rowCount === 0) {
    throw {
      code: 404,
      message: "No se encontró ningún equipamiento con ese id",
    };
  }
};

const eliminarEquipamiento = async (id) => {
  const consulta = "DELETE FROM equipamiento WHERE id = $1";
  const values = [id];
  const result = await pool.query(consulta, values);
};
//mostrarEquipamiento();
//agregarEquipamiento('Carpas');
module.exports = {
  agregarEquipamiento,
  mostrarEquipamiento,
  modificarEquipamiento,
  eliminarEquipamiento,
};
