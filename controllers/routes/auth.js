var express = require('express'),
	BigCommerce = require('node-bigcommerce'),
	mongoose = require('mongoose'),
	path = require('path'),
	request = require('../../models/request'),
	webhook = require('./createWebhook'),
	User = require('../../models/user');

var auth = function() {};

auth.prototype.install = function(req, res) {
	var bigCommerce = new BigCommerce({
		clientId: 'qfdokrnvzmd2o2pdztwhbtnujz0rfll',
		secret: '5nwic8047qdkc4wcfrno2n1vvh7de2u',
		callback: 'https://sortinghat.us/auth',
		responseType: 'json'
	});

	bigCommerce.authorise(req.query, function(err, data){

		var userData = JSON.stringify(data);
		var user = new User();

		user.storeHash = (JSON.parse(userData)).context;
		user.accessToken = (JSON.parse(userData)).access_token;
		user.idNum = (JSON.parse(userData)).user.id;
		user.email = (JSON.parse(userData)).user.email;

		user.save(function() {
			if (err) {
				return err;
			}
			//currentUser = user;
			webhook.createUpd(user);
			webhook.createCr(user);
		});
  	})
}

module.exports = new auth();
