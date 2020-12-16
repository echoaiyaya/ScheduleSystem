const mongoose = require('mongoose');
const workers = mongoose.model('workers');
const authority = require('./checkAuthority.js');


const workerLogin = function(req, res, next) {
	const workerPhone = req.body.phone;
	const workerPwd = req.body.password;
	
    workers.findOne({phone: workerPhone})
	     .exec((err, workerData) => {
	         if(err) {
	         	return res.status(404).json(err)
			 }
			 console.log(workerData)
			 if(workerData == null) {
				return res.status(202).json({"message": "login fault!", "code":"400"});
			 }
	         if (workerData.password == workerPwd) {
                req.session.userInfo = workerData;
                req.session.userInfo.level = 2;
				//console.log(req.session.userInfo);
				return res.status(201).json({"message": "login success!", "code":"200", "userId": workerData._id});
				
			 } else {
				return res.status(202).json({"message": "login fault!", "code":"400"});
			 }
	     });
};

const workerLogout = function(req, res, next) {
	req.session.userInfo = null;
	req.session.level = null
	return res.status(201).json({"message": "logout success", "code": "200"});
}

const workerLoginCheck = function(req, res, next) {
	if (req.session.userInfo) {
		return res.status(200).json({"message" : "already login!"});
		
	} else {
		return res.status(404).json({"message": "doesnt login!"});
	}
}; 


const getWorkers = function(req, res, next) {
	workers.find()
	     .exec((err, workersData) => {
	         if(err) {
                 res.status(404).json(err)
                 return;
	         }
	         return res.status(200).json(workersData);
	     })
};

const createWorkers = function(req, res, next) {
    newWorker = {
        firstName: req.body.firstName,
		lastName: req.body.lastName,
	    phone: req.body.phone,
		email: req.body.email,
        password: req.body.password,
        description: req.body.description,
        category: req.body.categoryId
    };
	workers.create( newWorker, (err, workersData) => {
		if (err) {
			res
			.status(400)
			.json(err);
		} else {
			res
			.status(201)
			.json(workersData);
		}
	});
};


const getSingleWorker = function(req, res, next) {
	workers.findById(req.params.workerId).populate('category').populate({path: 'comments', populate: {path: 'customerId'}})
	     .exec((err, workerData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(workerData);
	     });
};

const updateWorker = function(req, res, next) {
    if (!authority.checkWorker(2, req.session.userInfo, req.params.workerId)) {
        return res.status(400).json({"message": "no authority!"});
    }
	if (!req.params.workerId) {
		res
		.status(404)
		.json({
			"message" : "Not found, workerId is required"
		});
		return;
	}
	workers.findById(req.params.workerId)
	     .exec((err, workerData) => {
	     	if (!workerData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "worker not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
	     	workerData.firstName = req.body.firstName;
            workerData.lastName = req.body.lastName;
            workerData.phone = req.body.phone;
            workerData.email = req.body.email;
            workerData.password = req.body.password;
            workerData.description = req.body.description;
            workerData.category = req.body.categoryId;
            workerData.avaliable = req.body.avaliable;
	     	workerData.save((err, workerData) => {
	     		if (err) {
	     			res
	     			.status(404)
	     			.json(err);
	     		} else {
	     			res
	     			.status(200)
	     			.json(workerData)
	     		}
	     	});

	     });
};

const deleteWorker = function(req, res, next) {
    if (!authority.checkWorker(2, req.session.userInfo, req.params.workerId)) {
        return res.status(400).json({"message": "no authority!"});
    }
	const workerId = req.params.workerId;

	if (workerId) {
		workers
		.findByIdAndRemove(workersId)
		.exec((err, workerData) => {
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
		.json({"message" : "No worker"});
	}
};


module.exports = {
    getWorkers,
    getSingleWorker,
    createWorkers,
    updateWorker,
    deleteWorker,
    workerLogin,
	workerLoginCheck,
	workerLogout
};