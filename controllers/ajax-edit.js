const ajaxEditRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

//This class is only ever requested through ajax callbacks. It is used to retrieve a list of courseworks based on the selected 
//coursework ID.

ajaxEditRouter.get('/', function(request, response) {
    var coursework = request.query.coursework;
    var resultArray = [];
     var get_courseworks_by_coursework_id = 
     {
         "courseworkId" : coursework
     }
    dao.get_model_items(db_accessor.models.Coursework, get_courseworks_by_coursework_id).then(courseworks => {
        //TODO: Implement functionality which adds the retrieved coursework description to the first array index of 'resultArray',
        //      adds coursework milestones to the second index, and coursework completion date to the third index.


    }).catch(error => {
        console.log(error);
    }).finally(()=> {
        console.log(resultArray);
        response.send(resultArray);
    });
});

module.exports = ajaxEditRouter;