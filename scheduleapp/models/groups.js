const mongoose = require('mongoose');

const groupsSchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        required: true,
        minlength: 3
    },
    adminAccount: {
        type: String,
        required: true,
        minlength: 6
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 10
    },
    description: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        required: true
    },
    comments: [ commentSchema ]
});

const groups = mongoose.model('groups', groupsSchema);