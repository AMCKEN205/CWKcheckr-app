const removeCourseworkRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

//TODO: Add functionality which removes a coursework object from the Student collection.

removeCourseworkRouter.post('/', function(request, response) {
    
});

module.exports = removeCourseworkRouter;