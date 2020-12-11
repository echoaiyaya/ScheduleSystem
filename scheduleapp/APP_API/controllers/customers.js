const mongoose = require('mongoose');
const customers = mongoose.model('customers');
const groups = mongoose.model('groups');
const workers = mongoose.model('workers');

const getCustomers = function(req, res, next) {
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

// const createCommentsForWorkers = function(req, res, next) {
// 	if (!req.params.workerId) {
// 		res
// 		.status(404)
// 		.json({
// 			"message" : "Not found, workerId is required"
// 		});
// 		return;
// 	}
// 	workers.findById(req.params.workerId)
// 	     .exec((err, workerData) => {
// 	     	if (!workerData) {
// 	     		res
// 	     		.status(404)
// 	     		.json({
// 	     			"message" : "worker not found"
// 	     		});
// 	     		return;
// 	     	} else if (err) {
// 	     		res
// 	     		.status(400)
// 	     		.json(err);
// 	     		return;
// 	     	}
// 	     	comments = {};
// 	     	comments.cName = req.body.cName;
// 	     	comments.content = req.body.content;
// 	     	comments.rating = req.body.rating;
// 	     	comments.date = req.body.date;
// 	     	booksData.comments.push(comments);
// 	     	booksData.save((err, booksData) => {
// 	     		if (err) {
// 	     			res
// 	     			.status(404)
// 	     			.json(err);
// 	     		} else {
// 	     			res
// 	     			.status(200)
// 	     			.json(booksData)
// 	     		}
// 	     	});

// 	     });
// }

// const updateSingleComment = function(req, res, next) {
// 	if (!req.params.bookid) {
// 		res
// 		.status(404)
// 		.json({
// 			"message" : "Not found, bookid is required"
// 		});
// 		return;
// 	}
// 	if (!req.params.commentid) {
// 		res
// 		.status(404)
// 		.json({
// 			"message" : "Not found, commentid is required"
// 		});
// 		return;
// 	}
// 	books.findById(req.params.bookid)
// 	     .exec((err, bookData) => {
// 	     	if (!bookData) {
// 	     		res
// 	     		.status(404)
// 	     		.json({
// 	     			"message" : "bookid not found"
// 	     		});
// 	     		return;
// 	     	} else if (err) {
// 	     		res
// 	     		.status(400)
// 	     		.json(err);
// 	     		return;
// 	     	}
// 	     	var comment = bookData.comments.id(req.params.commentid);
// 	     	if (!comment) {
// 	     		res
// 	     		.status(404)
// 	     		.json({
// 	     			"message" : "commentid not found"
// 	     		});
// 	     		return;
// 	     	} else {
// 	     		comment.cName = req.body.cName;
// 	     		comment.rating = req.body.rating;
// 	     		comment.content = req.body.content;
// 	     		bookData.save((err, bookData) => {
// 		     		if (err) {
// 		     			res
// 		     			.status(404)
// 		     			.json(err);
// 		     		} else {
// 		     			res
// 		     			.status(200)
// 		     			.json(comment);
// 		     		}
// 		     	});
// 	     	}

// 	     });
// };

// const deleteSingleComment = function(req, res, next) {
// 	if (!req.params.bookid) {
// 		res
// 		.status(404)
// 		.json({
// 			"message" : "Not found, bookid is required"
// 		});
// 		return;
// 	}
// 	if (!req.params.commentid) {
// 		res
// 		.status(404)
// 		.json({
// 			"message" : "Not found, commentid is required"
// 		});
// 		return;
// 	}
// 	books.findById(req.params.bookid)
// 	     .exec((err, bookData) => {
// 	     	if (!bookData) {
// 	     		res
// 	     		.status(404)
// 	     		.json({
// 	     			"message" : "bookid not found"
// 	     		});
// 	     		return;
// 	     	} else if (err) {
// 	     		res
// 	     		.status(400)
// 	     		.json(err);
// 	     		return;
// 	     	}
// 	     	var comment = bookData.comments.id(req.params.commentid);
// 	     	if (!comment) {
// 	     		res
// 	     		.status(404)
// 	     		.json({
// 	     			"message" : "commentid not found"
// 	     		});
// 	     		return;
// 	     	} else {
// 	     		comment.remove();
// 	     		bookData.save((err, bookData) => {
// 		     		if (err) {
// 		     			res
// 		     			.status(404)
// 		     			.json(err);
// 		     		} else {
// 		     			res
// 		     			.status(200)
// 		     			.json(comment);
// 		     		}
// 		     	});
// 	     	}

// 	     });
// }



module.exports = {
    getCustomers,
    getSingleCustomer,
    createCustomers,
    updateCustomer,
    deleteCustomer
};