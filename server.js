const express = require('express');
const connectDB = require('./config/db');

const app = express();

app.use(express.json({ extended: false }));

connectDB();
// Define Routes
app.use('/api/todos', require('./routes/api/todos'));
app.use('/api/users', require('./routes/api/users'));

// Production: PORT vs Development:5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
