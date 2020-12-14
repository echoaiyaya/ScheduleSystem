const mongoose = require('mongoose');

const appointmentsSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'customers'
    },
    workerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'workers'
    },
    timeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'time'
    },
    timetableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'timeTables'
    },
    sequenceId: {
        type: Number,
        required: true,
        min: 1
    }
});


const appointments = mongoose.model('appointments', appointmentsSchema);