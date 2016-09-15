var express = require('express'),
	request = require('../../models/request'),
	bodyParser = require('body-parser'),
	qs = require('querystring'),
	User = require('../../models/user'),
	Base64 = require('js-base64').Base64;

var app = express();

var load = function() {};

function decodeData(data, callback) {
	data = Base64.decode(data.substring(0, data.indexOf('==')));
	callback(data);
}

load.prototype.getCustomerGroups = function(req, callback) {
	var payload = (qs.parse(req.url)),
		payload = payload['/get-customer-groups?signed_payload'];

	decodeData(payload, sendPayload)

	var storeHash;

	function sendPayload(pL) {
		storeHash = (JSON.parse(pL)).context;
		userLookup();
	}

	var cUser;

	function userLookup() {
		User.find({storeHash: storeHash}, function(err, user) {
			if (err) {
				return err;
			}
			cUser = user[0];
			request.GET(user[0].storeHash, user[0].accessToken, 'customer_groups', assignGroupData);
		});
	}

	function assignGroupData(data) {
		var customerGroups = data.map(function(i) {
			return i.name;
		});
		//console.log(customerGroups);
		//cUser.customerGroups = customerGroups;
		callback(customerGroups);
	}
}

module.exports = new load();
