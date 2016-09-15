var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	storeHash: String,
	accessToken: String,
	idNum: String,
	email: String,
	customerGroups: []
},
{collection: 'users'});

module.exports = mongoose.model('User', UserSchema, 'users');
