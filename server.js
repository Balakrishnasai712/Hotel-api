const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./db'); // Ensure the database connection is established

const app = express();

app.use(bodyParser.json());


app.get('/', (req, res) => res.send("Welcome to the Hotel API!"));

const personRouter = require('./routes/personRoutes');
const menuRouter = require('./routes/menuRoutes');
app.use('/person', personRouter);
app.use('/menu', menuRouter);

require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on port 3000"));