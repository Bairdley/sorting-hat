var https = require('https'),
	qs = require('querystring');

var request = function() {};

request.prototype.GET = function(storeHash, accessToken, resource, callback) {
	var options = {
		host: 'api.bigcommerce.com',
		path: '/' + storeHash + '/v2/' + resource,
		method: 'GET',
		headers: {
			"accept": "application/json",
			"X-Auth-Token": accessToken
		}
	};
	var req = https.request(options, function(res) {
		res.on('error', function(err) {
			console.log(err);
		})
		var body = '';
		res.on('data', function (chunk) {
	        body += chunk;
	    });
		res.on('end', function() {
			body = JSON.parse(body);
			callback(body);
		})
	});
	req.end();
}

request.prototype.PUT = function(storeHash, accessToken, resource, formData, callback) {
	var options = {
		host: 'api.bigcommerce.com',
		path: '/' + storeHash + '/v2/' + resource,
		method: 'PUT',
		headers: {
			"Content-Type": 'application/json',
			"Accept": "application/json",
			"X-Auth-Client": 'cqgu3x53749cricdncbuftvgsvcja2i',
			"X-Auth-Token": accessToken,
			"content-length": JSON.stringify(formData).length
		}
	};
	var req = https.request(options, function(res) {
		res.on('error', function(err) {
			console.log(err);
		})
		var body = '';
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function() {
            body = JSON.parse(body);
			console.log('Updated customer: ' + '\n' + body.first_name + ' ' + body.last_name);
		})
	});
	req.write(JSON.stringify(formData));
	req.end();
}

request.prototype.POST = function(userData, resource, formData) {
	var options = {
		host: 'api.bigcommerce.com',
		path: '/' + userData.storeHash + '/v2/' + resource,
		method: 'POST',
		headers: {
			"Content-Type": 'application/x-www-form-urlencoded',
			"Accept": "application/json",
			"X-Auth-Client": 'cqgu3x53749cricdncbuftvgsvcja2i',
			"X-Auth-Token": userData.accessToken,
		}
	}
	var form = formData;
	var req = https.request(options, function(res) {
		var body = '';
		res.on('error', function(error) {
			console.log(error);
		})
		res.on('data', function(chunk) {
			body += chunk;
		});
		res.on('end', function() {
			console.log(body);
		});
	});
	req.write(qs.stringify(form));
	req.end();
}

module.exports = new request();
