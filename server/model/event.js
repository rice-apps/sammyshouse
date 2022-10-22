const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    photo: {
        required: false,
        type: String
    },
    location: {
        required: false,
        type: String
    },
    date:{
        required: true,
        type: Date
    },
    description:{
        required: true,
        type: String
    },
    tags: {
        required: true,
        type: [String]
    },
    price: {
        required: false,
        type: Number
    }
});

module.exports = mongoose.model('Data', dataSchema);