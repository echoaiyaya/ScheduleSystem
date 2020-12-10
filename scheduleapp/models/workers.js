const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
	content : {
		type : String,
		required : true
	},
	rating : {
		type : Number,
		required : true,
		'default' : 0,
		min : 0,
		max : 5
	},
	date : {
		type : Date,
		required : true,
		'default' : Date.now
	}
});


// email is account

const workersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 10
    },
    gourpId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    avaliable: {
        type: Boolean,
        required: true
    },
    comments: [ commentSchema ]
});

const workers = mongoose.model('workers', workersSchema);