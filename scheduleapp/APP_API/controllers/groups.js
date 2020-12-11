const mongoose = require('mongoose');
const groups = mongoose.model('groups');

const getGroups = function(req, res, next) {
	groups.find()
	     .exec((err, groupsData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(groupsData);
	     })
};

const createGroups = function(req, res, next) {
    newGroup = {
        CompanyName: req.body.CompanyName,
		adminAccount: req.body.adminAccount,
	    mobile: req.body.mobile,
		email: req.body.email,
        password: req.body.password,
        description: req.body.description,
        category: req.body.categoryId 
    };
	groups.create( newGroup, (err, groupsData) => {
		if (err) {
			res
			.status(400)
			.json(err);
		} else {
			res
			.status(201)
			.json(groupsData);
		}
	});
};


const getSingleGroup = function(req, res, next) {
	groups.findById(req.params.groupId)
	     .exec((err, groupData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(groupData);
	     });
};

const updateGroup = function(req, res, next) {
	if (!req.params.groupId) {
		res
		.status(404)
		.json({
			"message" : "Not found, groupId is required"
		});
		return;
	}
	groups.findById(req.params.groupId)
	     .exec((err, groupData) => {
	     	if (!groupData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "group not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
	     	groupData.CompanyName = req.body.CompanyName;
            groupData.adminAccount = req.body.adminAccount;
            groupData.mobile = req.body.mobile;
            groupData.email = req.body.email;
            groupData.password = req.body.password;
            groupData.description = req.body.description;
            groupData.category = req.body.category;
	     	groupData.save((err, groupData) => {
	     		if (err) {
	     			res
	     			.status(404)
	     			.json(err);
	     		} else {
	     			res
	     			.status(200)
	     			.json(groupData)
	     		}
	     	});

	     });
};

const deleteGroup = function(req, res, next) {
	const groupId = req.params.groupId;

	if (groupId) {
		groups
		.findByIdAndRemove(groupsId)
		.exec((err, groupData) => {
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
		.json({"message" : "No group"});
	}
};


module.exports = {
    getGroups,
    getSingleGroup,
    createGroups,
    updateGroup,
    deleteGroup
};