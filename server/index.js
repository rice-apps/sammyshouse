require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const mongoString = process.env.DATABASE_URL;
const mongoPassword = process.env.DATABASE_PASSWORD;

mongoString.replace('<password>', mongoPassword);

// Connect to database
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log('Connected to database');
})

// Start server
const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server started at ${3000}`);
})