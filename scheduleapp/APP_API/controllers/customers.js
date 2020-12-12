const mongoose = require('mongoose');
const customers = mongoose.model('customers');
const groups = mongoose.model('groups');
const authority = require('./checkAuthority.js');
const workers = mongoose.model('workers');

const customerLogin = function(req, res, next) {
	const customerPhone = req.body.phone;
	const customerPwd = req.body.pwd;
    customers.findOne({phone: customerPhone})
	     .exec((err, customerData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         if (customerData.password == customerPwd) {
				req.session.userInfo = customerData;
				req.session.userInfo.level = 3;//0 is admin, 1 is group admin, 2 is workers, 3 is customers
				//console.log(req.session.userInfo);
				return res.status(201).json({"message": "login success!"});
				
			 } else {
				return res.status(404).json({"message": "login fault!"});
			 }
	     });
};

const customerLoginCheck = function(req, res, next) {
	if (req.session.userInfo) {
		return res.status(200).json({"message" : "already login!"});
		
	} else {
		return res.status(404).json({"message": "doesnt login!"});
	}
}; 

const getCustomers = function(req, res, next) {
	if(!authority.checkAdmin()) res.status(400).json({"message": "no authority"});
	customers.find()
	     .exec((err, customersData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(customersData);
	     })
};

const createCustomers = function(req, res, next) {
    newCustomer = {
        firstName: req.body.firstName,
		lastName: req.body.lastName,
	    phone: req.body.phone,
		email: req.body.email,
		password: req.body.password
    };
	customers.create( newCustomer, (err, customersData) => {
		if (err) {
			res
			.status(400)
			.json(err);
		} else {
			res
			.status(201)
			.json(customersData);
		}
	});
};


const getSingleCustomer = function(req, res, next) {
	customers.findById(req.params.customerId)
	     .exec((err, customerData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(customerData);
	     });
};

const updateCustomer = function(req, res, next) {
	if(!authority.checkAuthority(3, req.session.userInfo, req.params.customerId)) res.status(400).json({"message": "no authority"});
	if (!req.params.customerId) {
		res
		.status(404)
		.json({
			"message" : "Not found, customerId is required"
		});
		return;
	}
	
	customers.findById(req.params.customerId)
	     .exec((err, customerData) => {
	     	if (!customerData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "customer not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
	     	customerData.firstName = req.body.firstName;
            customerData.lastName = req.body.lastName;
            customerData.phone = req.body.phone;
            customerData.email = req.body.email;
            customerData.password = req.body.password;
	     	customerData.save((err, customerData) => {
	     		if (err) {
	     			res
	     			.status(404)
	     			.json(err);
	     		} else {
	     			res
	     			.status(200)
	     			.json(customerData)
	     		}
	     	});

	     });
};

const deleteCustomer = function(req, res, next) {
	if(!authority.checkAuthority(3, req.session.userInfo, req.params.customerId)) res.status(400).json({"message": "no authority"});
	const customerId = req.params.customerId;

	if (customerId) {
		customers
		.findByIdAndRemove(customersId)
		.exec((err, customerData) => {
			if (err) {
				res
				.status(404)
				.json(err);
				return;
			}
			res
			.status(204)
			.json({
				"message" : "delete success"
			});
		});
	} else {
		res
		.status(404)
		.json({"message" : "No customer"});
	}
};

const createComments = function(req, res, next) {
	if (!req.params.targetId) {
		res
		.status(404)
		.json({
			"message" : "Not found, targetId is required"
		});
		return;
	}
	const targetModel = workers;
	if (req.params.targetType == 2) {
		targetModel = groups;
	} 
	targetModel.findById(req.params.targetId)
	     .exec((err, targetData) => {
	     	if (!workerData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
	     	comments = {};
	     	comments.customerId = req.session.userInfo._id;
	     	comments.content = req.body.content;
	     	comments.rating = req.body.rating;
	     	comments.date = req.body.date;
	     	targetData.comments.push(comments);
	     	targetData.save((err, targetData) => {
	     		if (err) {
	     			res
	     			.status(404)
	     			.json(err);
	     		} else {
	     			res
	     			.status(200)
	     			.json(targetData)
	     		}
	     	});

	     });
}

const updateSingleComment = function(req, res, next) {
	const targetModel = workers;
	if (req.params.targetType == 2) {
		targetModel = groups;
	} 
	if (!req.params. targetId) {
		res
		.status(404)
		.json({
			"message" : "Not found, id is required"
		});
		return;
	}
	if (!req.params.commentid) {
		res
		.status(404)
		.json({
			"message" : "Not found, commentid is required"
		});
		return;
	}
	targetModel.findById(req.params.targetId)
	     .exec((err, targetData) => {
	     	if (!targetData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "targetId not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
	     	var comment = targetData.comments.id(req.params.commentid);
	     	if (!comment) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "commentid not found"
	     		});
	     		return;
	     	} else {
	     		comment.commentid = req.session.userInfo._id;
	     		comment.rating = req.body.rating;
	     		comment.content = req.body.content;
	     		targetData.save((err, targetData) => {
		     		if (err) {
		     			res
		     			.status(404)
		     			.json(err);
		     		} else {
		     			res
		     			.status(200)
		     			.json(comment);
		     		}
		     	});
	     	}

	     });
};

const deleteSingleComment = function(req, res, next) {
	const targetModel = workers;
	if (req.params.targetType == 2) {
		targetModel = groups;
	} 
	if (!req.params.targetId) {
		res
		.status(404)
		.json({
			"message" : "Not found, id is required"
		});
		return;
	}
	if (!req.params.commentid) {
		res
		.status(404)
		.json({
			"message" : "Not found, commentid is required"
		});
		return;
	}
	targetModel.findById(req.params.targetId)
	     .exec((err, targetData) => {
	     	if (!targetData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "id not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
	     	var comment = targetData.comments.id(req.params.commentid);
	     	if (!comment) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "commentid not found"
	     		});
	     		return;
	     	} else {
	     		comment.remove();
	     		targetData.save((err, targetData) => {
		     		if (err) {
		     			res
		     			.status(404)
		     			.json(err);
		     		} else {
		     			res
		     			.status(200)
		     			.json(comment);
		     		}
		     	});
	     	}

	     });
}



module.exports = {
    getCustomers,
    getSingleCustomer,
    createCustomers,
    updateCustomer,
	deleteCustomer,
	customerLogin,
	customerLoginCheck,
	createComments,
	updateSingleComment,
	deleteSingleComment
};