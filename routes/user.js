let express = require('express');
let router = express.Router();
let models = require('../models');
let Page = models.Page;
let User = models.User;

router.get('/', function(req, res, next) {
  let user = User.findAll().then((users)=>{
    res.render('users', {users:users});
  });
});

router.get('/:id', function(req, res, next) {

  var userPromise = User.findById(req.params.id);
  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then((values)=>{
    let users = values[0];
    let pages = values[1];
    let u =[];
    u.push(users);
    res.render('users',{users:u, pages:pages});
  });
});



module.exports = router;
