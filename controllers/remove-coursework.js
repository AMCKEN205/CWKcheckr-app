const removeCourseworkRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

//TODO: Add functionality

removeCourseworkRouter.post('/', function(request, response) {
    
});

module.exports = removeCourseworkRouter;