var express = require('express');
var router = express.Router();

const ctrlCategories = require('../controllers/categories');
const ctrlCustomers = require('../controllers/customers');
const ctrlAdmins = require('../controllers/admins');
const ctrlWorkers = require('../controllers/workers');

router.route('/admins')
      .get(ctrlAdmins.getAdmins)
      .post(ctrlAdmins.createAdmin);

router.route('/admins/:adminId')
      .put(ctrlAdmins.updateAdmin);

router.route('/aminds/login')
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

router.route('/workers')
      .get(ctrlWorkers.getWorkers)
      .post(ctrlWorkers.createWorkers);

router.route('/workers/:workerId')
      .get(ctrlWorkers.getSingleWorker)
      .put(ctrlWorkers.updateWorker)
      .delete(ctrlWorkers.deleteWorker);
      



module.exports = router;