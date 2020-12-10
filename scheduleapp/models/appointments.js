const mongoose = require('mongoose');

const appointmentsSchema = new mongoose.Schema({
    customerId: {
        type: ObjectId,
        required: true
    },
    workerId: {
        type: ObjectId,
        required: true
    },
    gourpId: {
        type: ObjectId,
        required: false
    },
    timetableId: {
        type: ObjectId,
        required: true
    },
    sequenceId: {
        type: Number,
        required: true,
        min: 1
    }
});


const appointments = mongoose.model('appointments', appointmentsSchema);