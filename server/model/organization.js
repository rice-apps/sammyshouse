const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    photo: {
        required: true,
        type: String
    },
    classification: {
        required: true,
        type: String
    },
    members: {
        required: true,
        type: [{
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Membership'
        }]
    },
    events: {
        required: true,
        type: [{
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Data' // TODO: change this to Event??
        }]
    }
});

module.exports = mongoose.model('Organization', organizationSchema);