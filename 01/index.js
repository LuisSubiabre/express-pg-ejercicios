const express = require('express');
const app = express();
const {agregarViaje, obtenerViajes} = require('./consultas');
const {agregarEquipamiento, mostrarEquipamiento} = require('./equipamiento');

app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000 :)");
});

app.get('/viajes', async (req, res) => {
    const viajes = await obtenerViajes();
    res.json(viajes);
});

app.post('/viajes', async (req, res) => {
    const { destino, presupuesto } = req.body;
    await agregarViaje(destino, presupuesto);
    res.send("Viaje agregado");
});

app.get('/equipamiento', async (req, res) => {
    const equipamiento = await mostrarEquipamiento();
    res.json(equipamiento);
});

app.post('/equipamiento', async (req, res) => {
    const { nombre } = req.body;   
    console.log(nombre);
    await agregarEquipamiento(nombre);
    res.send("Equipamiento agregado");
});

app.use('/', (req, res) => {
    res.send("404");
});