var storeGet = function() {};

storeGet.prototype.groups = function() {

	var token = '57as6uar0tm7atnau6dy2qrlkysi3wa';
	var options = {
		host: 'api.bigcommerce.com',
		path: '/stores/hsekdhl/v2/customer_groups',
		method: 'GET',
		headers: {
			"accept": "application/json",
			"X-Auth-Token": token
		}
	};
	var groupsArr = [];
	var req = https.request(options, function(res) {
		res.on('error', function(err) {
			console.log(err);
		})
		var body = '';
		res.on('data', function (chunk) {
			console.log(body += chunk);
		});
		res.on('end', function() {
			body = JSON.parse(body);
			// body.forEach(function(v) {
			// 	groupsArr.push('"' + v.name + '"');
			// });
			//fs.writeFile('./views/customerGroups.js', 'groupsArr = [' + groupsArr + ']');
			console.log(body);
		})
	});

	req.end();
}

module.exports = new storeGet();
