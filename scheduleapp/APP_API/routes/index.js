var express = require('express');
const { route } = require('../../APP_SERVER/routes');
var router = express.Router();

const ctrlCategories = require('../controllers/categories');
const ctrlCustomers = require('../controllers/customers');

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

module.exports = router;