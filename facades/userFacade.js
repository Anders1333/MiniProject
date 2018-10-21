var mongoose = require("mongoose");
var User = require("../models/User");
var Job = require("../models/User");


function getAllUsers() {
  return User.find({}).exec();
}

function addUser(firstName, lastName, userName, password, email, type, company, companyUrl) {
  var jobDetail = {type,company,companyUrl}
  var job = new Job(jobDetail);
  var userDetail = { userName, firstName, lastName, password,email, job };
  var user = new User(userDetail);
  return user.save();
}
 

function findByUsername(username){
  return User.findByUsername({ _userName:username }).exec();
}

function findById(id) {
  return User.findById({ _id:id }).exec();
}

module.exports = {
  getAllUsers: getAllUsers,
  addUser: addUser,
  findByUsername: findByUsername,
  findById: findById,
}