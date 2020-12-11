const mongoose = require('mongoose');

// admin has all function
const adminSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const admins = mongoose.model('admins', adminSchema);