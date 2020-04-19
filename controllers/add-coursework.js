const addCourseworkRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

//TODO: Add functionality which adds a new coursework object to the Student collection

addCourseworkRouter.post('/', function(request, response) {
    
});

module.exports = addCourseworkRouter;