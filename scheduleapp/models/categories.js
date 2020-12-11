const mongoose = require('mongoose');

// this is work category. the type of job
const categoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    avaible: {
        type: Boolean,
        required: true,
        default: true
    }
});


const categories = mongoose.model('categories', categoriesSchema);
