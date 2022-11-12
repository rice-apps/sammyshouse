const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    member: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    role: {
        required: true,
        type: String
    },
    organization: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
});

module.exports = mongoose.model('Membership', membershipSchema);