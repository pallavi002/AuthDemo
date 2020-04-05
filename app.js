const express               = require('express'),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      localStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      User                  = require('./models/user');
                              require('dotenv').config();

dbUri = process.env.DB_URI;
mongoose.connect(dbUri);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')( {
  secret: 'React is a great library',
  resave: false,
  saveUninitialized: false
}))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
  res.render('home.ejs');
});

app.get('/secret', function(req, res) {
  res.render('secret.ejs');
});

app.get('/register', function(req,res){
  res.render('register.ejs');
})

app.post('/register', function(req, res) {
  User.register( new User({ username: req.body.username }), req.body.password , function(err, user) {
    if(err) {
      console.log(err);
      return res.render('register.ejs');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/secret');
      })
    }
  });
})

app.get('/login', function(req,res){
  res.render('login.ejs');
})

app.listen('4080', function(){
  console.log('server listening on port 4080');
})