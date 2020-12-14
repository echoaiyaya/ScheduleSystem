const session = require('express-session');
const mongoose = require('mongoose');
const timetables = mongoose.model('timeTables');

const getTimeTables = function(req, res, next) {
	timetables.find().populate({path: 'workerId', populate: {path: 'category'}})
	     .exec((err, timetablesData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(timetablesData);
	     })
};

const getTimeTablesById = function(req, res, next) {
	timetables.find({workerId: {$in: req.params.workerId}})
	     .exec((err, timetablesData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(timetablesData);
	     })
};

const getCategoryTimeTables = function(req, res, next) {
	console.log(req.params.cid)
	timetables.find().populate({path: 'workerId', populate: {path: 'category'}})
	     .exec((err, timetablesData) => {
	         if(err) {
	         	return res.status(404).json(err)
			 }
			 let filterdata = timetablesData.filter(v => {
				 console.log(v.workerId.category._id)
				 return v.workerId.category._id == req.params.cid;
			 })
			 console.log(filterdata);

	         res.status(200).json(filterdata);
	     })
};

const createTimeTables = function(req, res, next) {
    newTimeTable = {
        workerId: req.body.workerId,
		year: req.body.year,
	    month: req.body.month,
		date: req.body.date,
	};
	console.log(newTimeTable)
	timetables.create( newTimeTable, (err, timetablesData) => {
		if (err) {
			res
			.status(400)
			.json(err);
		} else {
			console.log(timetablesData)
			res
			.status(201)
			.json(timetablesData);
		}
	});
};


const getSingleTimeTable = function(req, res, next) {
	timetables.findById(req.params.tid).populate({path: 'workerId', populate: {path: 'category'}})
	     .exec((err, timetableData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(timetableData);
	     });
};

const updateTimeTable = function(req, res, next) {
	if (!req.params.timetableId) {
		res
		.status(404)
		.json({
			"message" : "Not found, timetableId is required"
		});
		return;
	}
	timetables.findById(req.params.timetableId)
	     .exec((err, timetableData) => {
	     	if (!timetableData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "timetable not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
	     	timetableData.workId = req.body.workId;
            timetableData.year = req.body.year;
            timetableData.month = req.body.month;
            timetableData.date = req.body.date;
	     	timetableData.save((err, timetableData) => {
	     		if (err) {
	     			res
	     			.status(404)
	     			.json(err);
	     		} else {
	     			res
	     			.status(200)
	     			.json(timetableData)
	     		}
	     	});

	     });
};

const deleteTimeTable = function(req, res, next) {
	const timetableId = req.params.tid;
	console.log(timetableId)
	if (timetableId) {
		timetables
		.findByIdAndRemove(timetableId)
		.exec((err, timetableData) => {
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
		.json({"message" : "No timetable"});
	}
};

const createTimes = function(req, res, next) {
	console.log(req.params.timetableId)
	if (!req.params.timetableId) {
		res
		.status(404)
		.json({
			"message" : "Not found, targetId is required"
		});
		return;
	}
	timetables.findById(req.params.timetableId)
	     .exec((err, targetData) => {
	     	if (!targetData) {
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
	     	times = {};
	     	times.startHour = req.body.startHour
	     	times.startMin = req.body.startMin;
	     	times.endHour = req.body.endHour;
            times.endMin = req.body.endMin;
	     	targetData.times.push(times);
	     	targetData.save((err, targetData) => {
				console.log(targetData)
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

const updateSingleTime = function(req, res, next) {
	if (!req.params. targetId) {
		res
		.status(404)
		.json({
			"message" : "Not found, id is required"
		});
		return;
	}
	if (!req.params.timeid) {
		res
		.status(404)
		.json({
			"message" : "Not found, timeid is required"
		});
		return;
	}
	timetables.findById(req.params.targetId)
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
	     	var time = targetData.times.id(req.params.timeid);
	     	if (!time) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "timeid not found"
	     		});
	     		return;
	     	} else {
                times.startHour = req.session.userInfo._id;
                times.startMin = req.body.content;
                times.endHour = req.body.rating;
                times.endMin = req.body.date;
                times.reservationLimit = req.body.reservationLimit; 
                targetData.save((err, targetData) => {
		     		if (err) {
		     			res
		     			.status(404)
		     			.json(err);
		     		} else {
		     			res
		     			.status(200)
		     			.json(time);
		     		}
		     	});
	     	}

	     });
};

const deleteSingleTime = function(req, res, next) {
	if (!req.params.targetId) {
		res
		.status(404)
		.json({
			"message" : "Not found, id is required"
		});
		return;
	}
	if (!req.params.timeid) {
		res
		.status(404)
		.json({
			"message" : "Not found, timeid is required"
		});
		return;
	}
	timetables.findById(req.params.targetId)
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
	     	var time = targetData.times.id(req.params.timeid);
	     	if (!time) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "timeid not found"
	     		});
	     		return;
	     	} else {
	     		time.remove();
	     		targetData.save((err, targetData) => {
		     		if (err) {
		     			res
		     			.status(404)
		     			.json(err);
		     		} else {
		     			res
		     			.status(200)
		     			.json(time);
		     		}
		     	});
	     	}

	     });
}


module.exports = {
    getTimeTables,
    getSingleTimeTable,
    createTimeTables,
    updateTimeTable,
    deleteTimeTable,
    createTimes,
    updateSingleTime,
	deleteSingleTime,
	getCategoryTimeTables,
	getTimeTablesById
};