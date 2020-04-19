const editCourseworkRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

//TODO: Add functionality which updates an existing coursework object in the Student collection

editCourseworkRouter.post('/', function(request, response) {
    
});

module.exports = editCourseworkRouter;