var express = require('express');
var router = express.Router();
var blogFacade = require("../facades/blogFacade")

/* GET blogs Page. */
router.get('/', async function(req, res, next) {
  var allBlogs = [];
  allBlogs = await blogFacade.getAllBlogs();
  console.log(allBlogs);
  res.render('blog', { title: 'Blogs page',
                       allBlogs: allBlogs });
});

module.exports = router;