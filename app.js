'use strict';

let express = require('express');
let app = express();
let morgan = require('morgan');
let nunjucks = require('nunjucks');
let path = require('path');
let bodyParser = require('body-parser');
let models = require('./models/index');
let routes = require('./routes/index')


// have res.render work with html file
let env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

models.db.sync()
.then( () => {
  app.listen(1337,()=>{
    console.log('Server listening on 1337...');
  });
})
.catch(err => {
  console.log(err);
});


app.use(express.static(path.join(__dirname,'/public')));

app.use('/', routes);
