var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//const expressLayouts = require('express-ejs-layouts');
//var hbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const mongoIO = require('./io.js');
var expressValidator = require('express-validator');
var session = require('express-session');
const expressSanitizer = require('express-sanitizer');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect( db,{ useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

var routes = require('./routes/index1');

var app = express();
app.use(express.json());
// Mount express-sanitizer middleware here
app.use(expressSanitizer());

// EJS
//app.use(expressLayouts);
app.set('view engine', 'ejs');

// view engine setup
//app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'
//}));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'max', saveUninitialized: false, resave: false}));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Routes
app.use('/', routes);
//app.use('/signup', require('./routes/users.js'));
//app.use('/login', require('./routes/users.js'));
app.use('/users', require('./routes/users.js'));

//app.get('/login', (req,res)=> {
  //res.render('login');
//});

//app.get('/signup', (req,res)=> {
  //res.render('signup');
//})

//app.get('/aftSignup', (req,res)=> {
  //res.render('aftSignup');
//});

app.get('/will', (req,res)=> {
  res.render('will');
});

app.get('/payment', (req, res)=> {
  res.render('payment');
});



  

/*
function PostfeedbackAPI(req, res, next) {
	console.log(req.body);
	// var Write = [{'name': req.body.name},{'email': req.body.email[1]},{'phone': req.body.phone},
	// {'message': req.body.message}];

	var Write = [{'name': req.body.name, 'email': req.body.email[1], 'phone': req.body.phone, 'message': req.body.message}];
	try{
		mongoIO.writeItem(Write)
		
		//mongoIO.writeItem([{'name': req.body.name},
						   //{'email': req.body.email[1]},
						   //{'phone': req.body.phone},
						   //{'message': req.body.message}])	
	} catch (err) {
		next(err);
	}
	
	res.redirect('/#contact');
} */


app.post('/feedback', function (req, res, next) {

  req.session.success = true;

	console.log(req.body);
  
  //the escape() sanitization operation below removes HTML characters from the name variable that might be used in JavaScript cross-site scripting attacks.

  const sanitizedName = req.sanitize(req.body.name);
  const sanitizedEmail = req.sanitize(req.body.email[1]);
  const sanitizedPhone = req.sanitize(req.body.phone);
  const sanitizedMessage = req.sanitize(req.body.message);

  var Write = [{'name': sanitizedName.param, 'email': sanitizedEmail.param, 'phone': sanitizedPhone.param, 'message': sanitizedMessage.param}];
  //console.log(Write);
	try{
		mongoIO.writeItem(Write)
	} catch (err) {
		next(err);
  }

res.redirect('/#contact');

});            

/*

app.post('/feedback', PostfeedbackAPI)

//From the training for validation
req.check ('email', 'Invalid email address').isEmail();

var errors = req.validationErrors();
if (errors) {
  req.session.errors = errors;
  req.session.success = false;
} else {
  req.session.success = true;
}
res.redirect('/')

*/

 /* login_SignUp Back End Program starts here 

app.post('/signUp', function (req, res, next) {
 
  //to check user exist or not...............................
  var _name = req.body.name;

  myCheckUser(_name) {
    var self = this;
    return new Promise((resolve, reject) => {
        self.db.collection("USER").find({ "username": _name }, { $exists: true }).toArray(function    (err, doc) //find if a value exists
        {
            if (doc && doc.length) //if it does
            {
                console.log(doc); // print out what it sends back
                resolve("Found user");
            }
            else // if it does not 
            {
                console.log("Not in docs");
                reject("Not found continue logic!")
            }
        }
        )
        //_____________________________________________________________

  //req.session.success = true;

	//console.log(req.body);
  
  //the escape() sanitization operation below removes HTML characters from the name variable that might be used in JavaScript cross-site scripting attacks.

  const sanitizedName = req.sanitize(req.body.name);
  const sanitizedUname = req.sanitize(req.body.uname);
  const sanitizedEmail = req.sanitize(req.body.email);
  const sanitizedPassword = req.sanitize(req.body.password);
  const sanitizedCpassword = req.sanitize(req.body.cpassword);
  const sanitizedCheckbox = req.sanitize(req.body.checkbox);

  var Write = [{'name': sanitizedName.param, 'uname': sanitizedUname.param, 'email': sanitizedEmail.param, 'password': sanitizedPassword.param,'cpassword': sanitizedCpassword.param,'checkbox': sanitizedCheckbox.param}];
  //console.log(Write);
	try{
    mongoIO.writeSignup(Write)
    //console.log(Write);

    //console.log(Write[0].name);
    
	} catch (err) {
		next(err);
  }

res.redirect('./aftSignup');

});  */

/*
// Here we start to set up a temporary fake cassettes API endpoint
app.get('/signUp', function (req, res) {
	function sendDataCallback(err, docs) {
        if (docs) {
            res.json(docs)
            
        } else {
            console.log('ouch');
            console.log(err);
        }		
	}	

  mongoIO.readItem(sendDataCallback);
  
})*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
