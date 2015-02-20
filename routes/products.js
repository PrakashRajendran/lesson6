// list dependencies

var express = require('express');
var router = express.Router();

// add db & model dependencies
var mongoose = require('mongoose');
var Product = require ('../models/product');


// interpret GET /products - show product listing 
router.get('/products', function(req, res, next) {
	
	
	// retrieve all products using the product model; returns either an error or list of products
	Product.find(function (err, products) {
		// if we have an err
		if (err) {
			res.render('error', { error: err });
		}
		else {
			res.render('products', { products: products });
			console.log(products);
		}
	});
});

// GET /products/add - show input form
router.get('/products/add', function(req, res, next) {
	
		res.render('add');
});

// API GET products request handler
router.get('/api/products', function(req, res, next) {
	Product.find(function (err, products) {
		// if we have an err
		if (err) {
			res.end(err);
		}
		else {
			res.send(products);
		}
	});
});

// POST /products/add - get data from the input form
router.post('/products/add', function(req, res, next) {
	// use the Product model to insert a new product
	Product.create({
		title: req.body.title,
		description : req.body.description,
		price : req.body.price
	}, function(err, Product) {
		if (err) {
			console.log(err);
			res.render('error', { error: err });
		}
		else {
			console.log('Product saved' + Product);
			res.render('added', { product: Product.title });
		}
	});
});

// make controller public
module.exports = router;