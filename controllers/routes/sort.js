var express = require('express'),
	mongoose = require('mongoose'),
	User = require('../../models/user'),
	request = require('../../models/request');

var app = express();

var sort = function() {};

sort.prototype.go = function(body) {
	console.log(body);
	var cUser;
	User.find({storeHash: body.producer}, function(err, user) {
		if (!(user[0])) {
			console.log('Triggered webhook, but user not found in db!');
		} else {
            cUser = user[0];
            request.GET(user[0].storeHash, user[0].accessToken, 'customer_groups', assignGroupData);
            request.GET(user[0].storeHash, user[0].accessToken, 'customers/' + body.data.id, assignCustomerData);
        }
	});

	var customerObject,
		customerGroups;

	var count = 0;

	function assignCustomerData (x) {
		customerObject = x;
		checkCount()
	}

	function assignGroupData (x) {
		customerGroups = x;
		checkCount();
	}

	function checkCount() {
		count ++;
		if (count === 2) {
            !(customerObject.form_fields) ? console.log('Got customer data, but then customer not found!') : updateCustomer();
		}
	}

	function updateCustomer() {
		setTimeout(function() {
			if (!(customerObject.form_fields)) {
				console.log('Attempted to update customer, but customer not found!');
			} else {
				for (var i = 0; i < customerGroups.length; i ++) {
					if (customerGroups[i].name === customerObject.form_fields[0].value) {
						var formData = {
							'customer_group_id' : customerGroups[i].id
						}
						request.PUT(cUser.storeHash, cUser.accessToken, 'customers/' + customerObject.id, formData);
					}
				}
			}
		}, 2500);
	}
}

module.exports = new sort();
