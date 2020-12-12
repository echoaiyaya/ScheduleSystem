const mongoose = require('mongoose');
const appointments = mongoose.model('appointments');

const getAppointments = function(req, res, next) {
	appointments.find()
	     .exec((err, appointmentsData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(appointmentsData);
	     })
};

const createAppointments = function(req, res, next) {
    newAppointment = {
        workerId: req.body.workerId,
		customerId: req.session.userInfo._id,
	    groupId: req.body.groupId,
        timetableId: req.body.timetableId,
        sequenceId: req.body.sequenceId + 1
    };
	appointments.create( newAppointment, (err, appointmentsData) => {
		if (err) {
			res
			.status(400)
			.json(err);
		} else {
			res
			.status(201)
			.json(appointmentsData);
		}
	});
};


const getSingleAppointment = function(req, res, next) {
	appointments.findById(req.params.appointmentId)
	     .exec((err, appointmentData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(appointmentData);
	     });
};

const updateAppointment = function(req, res, next) {
	if (!req.params.appointmentId) {
		res
		.status(404)
		.json({
			"message" : "Not found, appointmentId is required"
		});
		return;
	}
	appointments.findById(req.params.appointmentId)
	     .exec((err, appointmentData) => {
	     	if (!appointmentData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "appointment not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
	     	appointmentData.customerId = req.body.customerId;
            appointmentData.workerId = req.body.workerId;
            appointmentData.groupId = req.body.groupId;
            appointmentData.timetableId = req.body.timetableId;
	     	appointmentData.save((err, appointmentData) => {
	     		if (err) {
	     			res
	     			.status(404)
	     			.json(err);
	     		} else {
	     			res
	     			.status(200)
	     			.json(appointmentData)
	     		}
	     	});

	     });
};

const deleteAppointment = function(req, res, next) {
	const appointmentId = req.params.appointmentId;

	if (appointmentId) {
		appointments
		.findByIdAndRemove(appointmentsId)
		.exec((err, appointmentData) => {
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
		.json({"message" : "No appointment"});
	}
};


module.exports = {
    getAppointments,
    getSingleAppointment,
    createAppointments,
    updateAppointment,
    deleteAppointment
};