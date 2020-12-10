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