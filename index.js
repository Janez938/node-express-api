const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Lista en memoria para almacenar los items
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
];

// GET: Obtener todos los items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// POST: Agregar un nuevo item
app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT: Actualizar un item existente
app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = {
        id: parseInt(id, 10),
        name: req.body.name
    };
    items = items.map(item => item.id === parseInt(id, 10) ? updatedItem : item);
    res.json(updatedItem);
});

// DELETE: Eliminar un item
app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id !== parseInt(id, 10));
    res.status(204).send();
});

// Servir el archivo estático
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});