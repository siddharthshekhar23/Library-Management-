const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const libraryRoutes = require('./routes/libraryRoutes');

const app = express();
const PORT = 3000;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simulated user database
const users = [
    { username: 'adm', password: 'adm', role: 'admin' },
    { username: 'user', password: 'user', role: 'user' }
];

// Home page (login)
app.get('/', (req, res) => {
    res.render('login');
});

// Handle Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.role === 'admin') {
            res.redirect('/library/admin');
        } else {
            res.redirect('/library/user');
        }
    } else {
        res.render('login', { error: 'Invalid username or password' });
    }
});

// Use library routes
app.use('/library', libraryRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
