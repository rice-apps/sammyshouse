const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    role: {
        required: true,
        type: String
    },
    organization: {
        required: true,
    }
});

module.exports = mongoose.model('Membership', membershipSchema);