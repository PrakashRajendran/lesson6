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


// make controller public
module.exports = router;