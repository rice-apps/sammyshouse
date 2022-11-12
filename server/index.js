require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/event');
const profileRoutes = require('./routes/profile');

const mongoString = process.env.DATABASE_URL;
const mongoPassword = process.env.npm_config_db_pass;

mongoUrl = mongoString.replace('<password>', mongoPassword);

// Connect to database
mongoose.connect(mongoUrl);
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
app.use(cors());
app.use('/api/events', eventRoutes);
app.use('/api/profiles', profileRoutes);

app.listen(3000, () => {
    console.log(`Server started at ${3000}`);
})