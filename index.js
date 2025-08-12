// index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory data
let items = [
  { id: 1, name: 'Item One' },
  { id: 2, name: 'Item Two' },
];

// Routes
app.get('/', (req, res) => {
  res.send('API is running!');
});

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const newItem = {
    id: items.length + 1,
    name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== parseInt(id));
  res.json({ message: 'Item deleted' });
});

// Start server
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
