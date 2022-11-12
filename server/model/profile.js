const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    college: {
        required: true,
        type: String
    },
    year: {
        required: true,
        type: Number
    },
    photo: {
        required: false,
        type: String
    },
    memberships: {
        required: true,
    }
});

module.exports = mongoose.model('Profile', profileSchema);