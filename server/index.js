require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/routes.js');
const imageRouter = require('./routes/image');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');

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

// Create storage engine.
const storage = new GridFsStorage({
    url: mongoUrl,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

// Start server
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use('/image', imageRouter(mongoUrl, upload));

app.listen(3000, () => {
    console.log(`Server started at ${3000}`);
})