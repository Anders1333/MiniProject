var express = require('express');
var router = express.Router();

/* GET Positions Page. */
router.get('/', function(req, res, next) {
  res.render('position', { title: 'positions page' });
});

module.exports = router;