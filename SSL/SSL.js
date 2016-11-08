var fs = require('fs')

var privateKey = fs.readFileSync('./SSL/server.key', 'utf8'),
    sslCert = fs.readFileSync('./SSL/2_sortinghat.us.crt', 'utf8'),
	caCert = fs.readFileSync('./SSL/1_Intermediate.crt', 'utf8');

var credentials = {
	key: privateKey,
	cert: sslCert,
	ca: caCert
};

module.exports = credentials
