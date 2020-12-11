const mongoose = require('mongoose');
const admins = mongoose.model('admins');


const adminLogin = function(req, res, next) {
	const adminAccount = req.body.account;
	const adminPwd = req.body.pwd;
    admins.findOne({account: adminAccount})
	     .exec((err, adminData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         if (adminData.password == adminPwd) {
				req.session.userInfo = adminData;
				req.session.userInfo.level = 0;//0 is admin, 1 is group admin, 2 is workers, 3 is admins
				//console.log(req.session.userInfo);
				return res.status(201).json({"message": "login success!"});
				
			 } else {
				return res.status(404).json({"message": "login fault!"});
			 }
	     });
};

const adminLoginCheck = function(req, res, next) {
	if (req.session.userInfo) {
		return res.status(200).json({"message" : "already login!"});
		
	} else {
		return res.status(404).json({"message": "doesnt login!"});
	}
}; 

const getAdmins = function(req, res, next) {
	admins.find()
	     .exec((err, adminsData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(adminsData);
	     })
};

const createAdmin = function(req, res, next) {
	admins.create({
		account: req.body.account,
		password: req.body.password
	}, (err, adminsData) => {
		if (err) {
			res
			.status(400)
			.json(err);
		} else {
			res
			.status(201)
			.json(adminsData);
		}
	});
};


const updateAdmin = function(req, res, next) {
	if (!req.params.adminId) {
		res
		.status(404)
		.json({
			"message" : "Not found, adminId is required"
		});
		return;
	}
	admins.findById(req.params.adminId)
	     .exec((err, adminsData) => {
	     	if (!adminsData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "admin not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
             adminsData.account = req.body.account;
             adminsData.password = req.body.password;
	     	adminsData.save((err, adminData) => {
	     		if (err) {
	     			res
	     			.status(404)
	     			.json(err);
	     		} else {
	     			res
	     			.status(200)
	     			.json(adminData)
	     		}
	     	});

	     });
};

module.exports = {
    getAdmins,
    createAdmin,
    updateAdmin,
    adminLogin,
    adminLoginCheck
};