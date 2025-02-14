const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./db'); // Ensure the database connection is established
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();
const passport = require('./auth');

app.use(bodyParser.json());

//Middleware function to log requests
const logRequest = (req, res, next) => {
    console.log(`${new Date()} Request made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest);

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.use(passport.initialize());
app.get('/', localAuthMiddleware, (req, res) => res.send("Welcome to the Hotel API!"));

const personRouter = require('./routes/personRoutes');
const menuRouter = require('./routes/menuRoutes');
app.use('/person', personRouter);
app.use('/menu', menuRouter);


app.listen(PORT, () => console.log("Server is running on port 3000"));