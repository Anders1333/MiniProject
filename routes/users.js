var express = require('express');
var router = express.Router();
var userFacade = require('../facades/userFacade')


/* GET users Page. */
router.get('/', async function(req, res, next) {
var allUsers = []
allUsers = await userFacade.getAllUsers();
console.log(allUsers)
  res.render('user', { title: 'Users page', 
                       allUsers: allUsers                  
});
});

router.post('/addUser', async function (req,res,next){
userFacade.addUser(req.body.firstname,
                   req.body.lastname,
                   req.body.username,
                   req.body.password,
                   req.body.email,
                   req.body.position,
                   req.body.company,
                   req.body.companyUrl);

allUsers = await userFacade.getAllUsers();
res.render('user', { title: 'Users page', 
allUsers: allUsers 
});
})

module.exports = router;