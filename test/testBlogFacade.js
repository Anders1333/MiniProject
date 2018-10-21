const mongoose = require("mongoose");
const chai = require("chai");
var assert = require('chai').assert;
const expect = require('chai').expect;
const dbSetup = require("..//dbSetup");


mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.connection = {};

var blogFacade = require("../facades/blogFacade");
var userFacade = require("../facades/userFacade")
var LocationBlog = require("../models/LocationBlog");
var User = require('../models/User');

let connection = null;


describe("Testing the Blog Facade", function () {

  /* Connect to the TEST-DATABASE */
  before(async function () {
    this.timeout(require("../settings").MOCHA_TEST_TIMEOUT);
    await dbSetup(require("../settings").TEST_DB_URI);
  })

  after(function () {
    mongoose.connection.close();
  })
  
  var blogs = [];
  var users = [];
  /* Setup the database in a known state (2 users) before EACH test */
  beforeEach(async function () {
    await User.deleteMany({}).exec();
    await LocationBlog.deleteMany({}).exec();
    users = await Promise.all([
        new User({ firstName: "Kurt", lastName: "Wonnegut", userName: "kw", password: "test", email: "a@b.dk" }).save(),
        new User({ firstName: "Hanne", lastName: "Wonnegut", userName: "hw", password: "test", email: "b@b.dk" }).save(),
      ])
    blogs = await Promise.all([
        blogFacade.addLocationBlog("Cool Place", 26, 28, users[0]._id, null,null),
        blogFacade.addLocationBlog("Another Cool Place", 389,398, users[1]._id, null,null)
    ])
  })

   // Remember to change database and add users before test! 
  it("Should add Location blog", async function () {
    await blogFacade.addLocationBlog("A third Cool place", 300, 500, users[0].id, null,null)
    var blogs = await blogFacade.getAllBlogs();
    expect(blogs.length).to.be.equal(3);
  });


  it("Should like a location blog", async function () {
    var blogs = await blogFacade.getAllBlogs()
    console.log(blogs)
    var users = await userFacade.getAllUsers()
    console.log(users)
    blogFacade.likeLocationBlog(users[1],blogs[1]);
    expect(blogs[1].likedByCount).to.be.equal(1);
  });


})