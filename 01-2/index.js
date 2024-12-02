const express = require("express");
const app = express();
const {
  agregarViaje,
  obtenerViajes,
  modificarPresupuesto,
  eliminarViaje,
} = require("./consultas");
const {
  agregarEquipamiento,
  mostrarEquipamiento,
  modificarEquipamiento,
  eliminarEquipamiento,
} = require("./equipamiento");

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000 :)");
});

app.get("/viajes", async (req, res) => {
  const viajes = await obtenerViajes();
  res.json(viajes);
});

app.post("/viajes", async (req, res) => {
  try {
    const { destino, presupuesto } = req.body;
    await agregarViaje(destino, presupuesto);
    res.send("Viaje agregado con éxito");
  } catch (error) {
    const { code } = error;
    if (code === "23502") {
      res
        .status(400)
        .send(
          'Se ha violado la restricción NOT NULL en uno de los campos de la tabla"'
        );
    }
    res.status(500).send(error);
  }
});

app.put("/viajes/:id", async (req, res) => {
  const { id } = req.params;
  const { presupuesto } = req.query;
  try {
    await modificarPresupuesto(presupuesto, id);
    res.send("Presupuesto modificado con éxito");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});

app.delete("/viajes/:id", async (req, res) => {
  const { id } = req.params;
  await eliminarViaje(id);
  res.send("Viaje eliminado con éxito");
});

/* EQUIPAMIENTO */

app.get("/equipamiento", async (req, res) => {
  const equipamiento = await mostrarEquipamiento();
  res.json(equipamiento);
});

app.post("/equipamiento", async (req, res) => {
  try {
    const { nombre } = req.body;
    console.log(nombre);
    await agregarEquipamiento(nombre);
    res.send("Equipamiento agregado");
  } catch (error) {
    const { code } = error;
    if (code == "23502") {
      res.send(
        'Se ha violado la restricción NOT NULL en uno de los campos de la tabla"'
      );
    } else {
      res.status(500).send(error);
    }
  }
});

app.put("/equipamiento/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.query;
  try {
    await modificarEquipamiento(nombre, id);
    res.send("Equipamiento modificado");
  } catch ({ code, message }) {
    res.status(code).send(message);
  }
});

app.delete("/equipamiento/:id", async (req, res) => {
  const { id } = req.params;
  await eliminarEquipamiento(id);
  res.send("Equipamiento eliminado con éxito");
});

app.use("/", (req, res) => {
  res.send("404");
});
