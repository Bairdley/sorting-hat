var request = require('../../models/request');

var webhook = function() {};

webhook.prototype.createUpd = function(userData) {
	var form = {
		"scope": "store/customer/updated",
		"destination": "https://sortinghat.us/sort",
		"is_active": true
	};
	request.POST(userData, 'hooks', form);
	console.log('webhook created');
}
webhook.prototype.createCr = function(userData) {
	var form = {
		"scope": "store/customer/created",
		"destination": "https://sortinghat.us/sort",
		"is_active": true
	};
	request.POST(userData, 'hooks', form);
	console.log('webhook created');
}

module.exports = new webhook();
