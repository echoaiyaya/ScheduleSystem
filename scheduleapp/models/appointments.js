const mongoose = require('mongoose');

const appointmentsSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    workerId: {
        type: String,
        required: true
    },
    groupId: {
        type: String,
        required: false
    },
    timetableId: {
        type: String,
        required: true
    },
    sequenceId: {
        type: Number,
        required: true,
        min: 1
    }
});


const appointments = mongoose.model('appointments', appointmentsSchema);