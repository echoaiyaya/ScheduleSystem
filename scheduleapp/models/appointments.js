const mongoose = require('mongoose');

const appointmentsSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    timetableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sequenceId: {
        type: Number,
        required: true,
        min: 1
    }
});


const appointments = mongoose.model('appointments', appointmentsSchema);