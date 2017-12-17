let express = require('express');
let router = express.Router();
let wikiRouter = require('./wiki');
let userRouter = require('./user');
let models = require('../models');
let Page = models.Page;
let User = models.User;

router.get('/', (req,res,next)=>{
  Page.findAll().then((pageArr) => {
    res.render('index', {pageArr:pageArr});
  });
});
router.use('/wiki', wikiRouter);
router.use('/users', userRouter);
module.exports = router;
