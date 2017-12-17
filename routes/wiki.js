let express = require('express');
let router = express.Router();
let models = require('../models');
let Page = models.Page;
let User = models.User;

router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {

  User.findOrCreate({
    where: {
      email: req.body.author_email,
      name: req.body.author_name
    }
  }).spread((foundUser, created) => {
      let page = Page.build({
        title: req.body.title,
        content: req.body.page_content,
        status: req.body.page_status,
        authorId: foundUser.id
      });
      page.save().then((p) => {
        res.redirect('/wiki/'+p.urlTitle);
      });
  });
});

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.get('/:url', function(req, res, next) {
    Page.findOne({
    where: {
      urlTitle: req.params.url
    }
  }).then((foundPage)=>{
    res.render('wikipage',{foundPage:foundPage});
  });
});

module.exports = router;
