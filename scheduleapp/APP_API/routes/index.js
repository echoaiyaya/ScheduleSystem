var express = require('express');
var router = express.Router();

const ctrlCategories = require('../controllers/categories');
const ctrlCustomers = require('../controllers/customers');
const ctrlAdmins = require('../controllers/admins');
const ctrlWorkers = require('../controllers/workers');
const ctrlTimeTables = require('../controllers/timetables');
const ctrlAppointment = require('../controllers/appointments');

router.route('/admins')
      .get(ctrlAdmins.getAdmins)
      .post(ctrlAdmins.createAdmin);

router.route('/admins/:adminId')
      .put(ctrlAdmins.updateAdmin);

router.route('/admins/login')
      .post(ctrlAdmins.adminLogin)
      .get(ctrlAdmins.adminLoginCheck);

router.route('/categories')
      .get(ctrlCategories.getfilterCategories);
      
router.route('/allcategories')
      .get(ctrlCategories.getCategories)
      .post(ctrlCategories.createCategory);

router.route('/allcategories/:categoryId')
      .get(ctrlCategories.getSingleCategory)
      .put(ctrlCategories.updateCategory);

router.route('/customers')
      .get(ctrlCustomers.getCustomers)
      .post(ctrlCustomers.createCustomers);

router.route('/customers/:customerId')
      .get(ctrlCustomers.getSingleCustomer)
      .put(ctrlCustomers.updateCustomer)
      .delete(ctrlCustomers.deleteCustomer);

router.route('/customer/login')
      .get(ctrlCustomers.customerLoginCheck)
      .post(ctrlCustomers.customerLogin);

router.route('/customer/logout')
      .get(ctrlCustomers.customerLogout);

router.route('/customer/comment/:targetId')
      .post(ctrlCustomers.createComments);

router.route('/customer/comment/:targetId/:commentId')
      .delete(ctrlCustomers.deleteSingleComment);

router.route('/workers')
      .get(ctrlWorkers.getWorkers)
      .post(ctrlWorkers.createWorkers);

router.route('/workers/:workerId')
      .get(ctrlWorkers.getSingleWorker)
      .put(ctrlWorkers.updateWorker)
      .delete(ctrlWorkers.deleteWorker);
      
router.route('/timeTables')
      .get(ctrlTimeTables.getTimeTables)
      .post(ctrlTimeTables.createTimeTables);

router.route('/timeTable/:tid')
      .get(ctrlTimeTables.getSingleTimeTable);

router.route('/timeTables/:cid')
      .get(ctrlTimeTables.getCategoryTimeTables);

router.route('/appointment')
      .post(ctrlAppointment.createAppointments);

router.route('/appointment/:customerId')
      .get(ctrlAppointment.getAppointmentsById);

router.route('/appointment/:appointmentId')
      .delete(ctrlAppointment.deleteAppointment);



module.exports = router;