var mongoose = require("mongoose");
var LocationBlog = require("../models/LocationBlog");




function addLocationBlog (info, longitude, latitude, author, likedBy, created ) {
    var pos = {longitude,latitude}
    var LocationBlogDetail = {info, pos, author,likedBy,created };
    var blog = new LocationBlog(LocationBlogDetail);
    return blog.save();
  }

function getAllBlogs(){
    return LocationBlog.find({}).exec();
}


function likeLocationBlog(user,blog){
    blog.likedBy.push(user._id);
}


module.exports = {
    addLocationBlog: addLocationBlog,
    getAllBlogs: getAllBlogs,
    likeLocationBlog: likeLocationBlog,
  }