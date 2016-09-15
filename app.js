var express = require('express'),
	https = require('https'),
	fs = require('fs'),
	mongoose = require('mongoose'),
	BigCommerce = require('node-bigcommerce'),
	path = require('path'),
	request = require('./models/request'),
	auth = require('./controllers/routes/auth'),
	load = require('./controllers/routes/load'),
	sort = require('./controllers/routes/sort'),
	User = require('./models/user'),
    credentials = require('./SSL/SSL');

var app = express();

mongoose.connect('mongodb://127.0.0.1/users').connection;
mongoose.connection.on('connected', function() {
	console.log('DB up and running...');
});

app.use(express.static('views'));

app.get('/auth', function(req, res) {
	auth.install(req, res);
	res.sendFile(path.join(__dirname + '/views/install.html'));
});

app.get('/load', function(req, res) {
	//load.getCustomerGroups(req);
	res.sendFile(path.join(__dirname + '/views/install.html'));
})

app.get('/get-customer-groups', function(req, res) {
	load.getCustomerGroups(req, sendCustomerGroups);
	function sendCustomerGroups(data) {
		res.send(data);
	}
})

app.post('/sort', function(req, res) {
	console.log('sort');
	var body = '';
	req.on('data', function(chunk) {
		body += chunk;
	}).on('end', function() {
		body = JSON.parse(body);
		sort.go(body);
	});
    res.on('end', function() {
        res.writeHead(200, {'Content-Type': 'text/plain'});
    })
    res.end();
})

var server = https.createServer(credentials, app)
server.listen(443);

console.log('App listening...')
