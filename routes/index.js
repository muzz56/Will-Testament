const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userNas:userNas@cluster0-jzbyc.gcp.mongodb.net/html_form?retryWrites=true&w=majority'); 
var Schema = mongoose.Schema;

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var userDataSchema = new Schema({
  name: {type: String, required: true},
  email: String,
  phone: String,
  message: String
}, {collection: 'feedback'});

var UserData = mongoose.model('UserData', userDataSchema);

var usrDataSchema = new Schema({
  nom: {type: String, required: true},
  prenom: String,
  phone: String,
  prenom: String,
  society: String,
  addresse: String,
  message: String,
  prenom: String,
  phone: String,
  prenom1: String,
  phone: String
}, {collection: 'User_info'});

var UsrData = mongoose.model('UsrData', usrDataSchema);

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Welcome Page
router.get('/will', forwardAuthenticated, (req, res) => res.render('will'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

router.post('/feedback', function(req, res, next) {
  var item = {
    name: req.body.name,
    email: req.body.email[1],  
    phone: req.body.phone,
    message: req.body.message
  };

  var data = new UserData(item);
  data.save();
 
  res.redirect('/');
});


router.post('/willinsert', function(req, res, next) {
  var item1 = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    phone: req.body.phone,
    prenom: req.body.prenom,
    society: req.body.society,
     addresse: req.body.address,
    message: req.body.message,
    prenom: req.body.prenom,
    phone: req.body.phone,
    prenom1: req.body.prenom1,
    phone: req.body.phone
  };

  var dta = new UsrData(item1);
  dta.save();
 
  res.redirect('/will');
});

module.exports = router;
