const mongoose = require('mongoose');


//reservationLimit is about in this period.
const timeSchema = new mongoose.Schema({
    startHour: {
        type: Number,
        required: true,
        min: 0,
        max: 24
    },
    startMin: {
        type: Number,
        required: true,
        min: 0,
        max: 60
    },
    endHour: {
        type: Number,
        required: true,
        min: 0,
        max: 24
    },
    endMin: {
        type: Number,
        required: true,
        min: 0,
        max: 60
    },
    reservationLimit: {
        type: Number,
        required: true,
        min: 1,
        max: 999
    }
});

const timeTableSchema = new mongoose.Schema({
    workerId: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: 2020,
        max: 2025
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    date: {
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    times: [ timeSchema ]
});

const timeTable = mongoose.model('timeTable', timeTableSchema);
