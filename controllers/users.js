//Logic for all calls to api/user will be handled here
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const users = require('./testUsers')
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

// add new user
usersRouter.post('/', function (req,res) {
  const body = req.body
  if(body.registerPassword !== body.confirm) {
    var nomatch = encodeURIComponent(false);
    res.redirect('/register?passmatch=' +nomatch);
    return;
  }
  var fullname = body.registerName;
  var username = body.registerUsername;
  var password = body.registerPassword;
  dao.add_student(fullname, username, password).then(outcome => {
    if(outcome == 0){
      var userexists = encodeURIComponent(true);
      res.redirect('/register?userexists=' + userexists);
      return;
    }
    if(outcome == false) {
      var dberror = encodeURIComponent(true);
      res.redirect('/register?dberror=' + dberror);
      return;
    }
    if(outcome == true) {
      res.redirect('/reg-success');
      return;
    }
  })
  .catch(err =>{
    console.log(err);
    res.redirect('/register');
  });
})

module.exports = usersRouter;