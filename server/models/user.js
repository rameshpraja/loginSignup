const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  
  firstname: {
    type: String
  },
  surname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
  },
  
  password: {
    type: String,

  },
  contact: {
    type: String,

  },
  address: {
    type: String,

  },
  dob: {
    type: String,

  },
  imageUrl:{
  type:String,
},


});

const User = module.exports = mongoose.model('Login', UserSchema);
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}
module.exports.getUserByEmail = function(email, callback){
	const query = {email: email}
	User.findOne(query, callback);
  }
module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
