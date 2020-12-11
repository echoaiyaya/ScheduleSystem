const mongoose = require('mongoose');
const categories = mongoose.model('categories');

const getfilterCategories = function(req, res, next) {
	categories.find({avaible: {$in: true}})
	     .exec((err, categoriesData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(categoriesData);
	     })
};

const getCategories = function(req, res, next) {
	categories.find({avaible: {$in: true}})
	     .exec((err, categoriesData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(categoriesData);
	     })
};

const getSingleCategory = function(req, res, next) {
	categories.findById(req.params.categoryId)
	     .exec((err, categoryData) => {
	         if(err) {
	         	return res.status(404).json(err)
	         }
	         res.status(200).json(categoryData);
	     });
};

const createCategory = function(req, res, next) {
	categories.create({
		title: req.body.title
	}, (err, categoriesData) => {
		if (err) {
			res
			.status(400)
			.json(err);
		} else {
			res
			.status(201)
			.json(categoriesData);
		}
	});
};


const updateCategory = function(req, res, next) {
	if (!req.params.categoryId) {
		res
		.status(404)
		.json({
			"message" : "Not found, categoryId is required"
		});
		return;
	}
	categories.findById(req.params.categoryId)
	     .exec((err, categoriesData) => {
	     	if (!categoriesData) {
	     		res
	     		.status(404)
	     		.json({
	     			"message" : "category not found"
	     		});
	     		return;
	     	} else if (err) {
	     		res
	     		.status(400)
	     		.json(err);
	     		return;
	     	}
	     	categoriesData.title = req.body.title;
	     	categoriesData.save((err, categoryData) => {
	     		if (err) {
	     			res
	     			.status(404)
	     			.json(err);
	     		} else {
	     			res
	     			.status(200)
	     			.json(categoryData)
	     		}
	     	});

	     });
};

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
	getfilterCategories,
	getSingleCategory
};