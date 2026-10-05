// Author: Rivera, Ella Nicole T.
// Activity: Basic Express Routing Using GET

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Data for menu
const menu = [
  { id: 1, name: 'Espresso',   category: 'hot', price: 90,  image: '/images/espresso.jpg',   description: 'A rich and bold coffee shot, perfect for a quick caffeine boost.' },
  { id: 2, name: 'Cappuccino', category: 'hot', price: 120, image: '/images/cappuccino.jpg', description: 'A classic Italian coffee drink with equal parts espresso, steamed milk, and froth.' },
  { id: 3, name: 'Latte',      category: 'hot', price: 130, image: '/images/latte.jpg',      description: 'A smooth and creamy coffee made with espresso and steamed milk, topped with a light layer of foam.' },
  { id: 4, name: 'Iced Mocha', category: 'iced', price: 150, image: '/images/mocha.jpg',     description: 'Chilled espresso blended with chocolate and milk over ice.' }
];

// Middleware to log page visits
const pageNames = { '/': 'home.html', '/menu': 'menu.html', '/about': 'about.html', '/contact': 'contact.html' };
app.use((req, res, next) => {
  if (req.method === 'GET' && pageNames[req.path]) {
    console.log(`Rendering ${pageNames[req.path]} (${req.path})`);
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public'), { index: false }));

// Page routes
// used a function to avoid repeating the same code for each route
const sendPage = (file) => (req, res) =>
  res.sendFile(path.join(__dirname, 'public', file));
// basically this function would ask for an argument, this is where I put the html file name, and then it would return a function that takes the request and response objects, and then it would send the file to the client. 

app.get('/', sendPage('index.html'));
app.get('/menu', sendPage('menu.html'));
app.get('/about', sendPage('about.html'));
app.get('/contact', sendPage('contact.html'));

// GET
app.get('/api/menu', (req, res) => {
  const { category, maxPrice } = req.query;
  let items = menu;
  if (category) items = items.filter(i => i.category === category);
  if (maxPrice) items = items.filter(i => i.price <= Number(maxPrice));
  res.json(items);
});

// parameter
app.get('/api/menu/:id', (req, res) => {
  const item = menu.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Menu item not found' });
  res.json(item);
});

// 404 handler
app.use((req, res) => {
  console.log(`404 Not Found: ${req.originalUrl}`);
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => console.log(`Elite Coffee running at http://localhost:${PORT}`));
