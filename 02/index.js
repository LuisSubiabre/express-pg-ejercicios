const express = require('express');
const app = express();
const {obtenerUsuarios, agregarUsuario} = require('./usuarios');

app.use(express.json());

app.listen(3002, () => {
    console.log("Server is running on port 3002 ");
});

app.get('/usuarios', async (req, res) => {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
});

app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const usuarios = await obtenerUsuarios(id);
    res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
    const { email, password } = req.body;
    await agregarUsuario(email, password);
    res.send("Usuario agregado");
});

app.use('/', (req, res) => {
    res.send("404");
});