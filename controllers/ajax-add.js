const ajaxAddRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

//This class is only ever requested through ajax callbacks. It is used to retrieve a list of courseworks based on the selected 
//course ID.

ajaxAddRouter.get('/', function(request, response) {
  const studentNo = request.body.studentNo || request.session.passport.user
    console.log(studentNo)
    var course = request.query.course;
    var options = "";
     var get_courseworks_by_course_id = 
     {
         "courseId" : course
     }
    dao.get_model_items(db_accessor.models.Student, {"studentNo": studentNo}).then(student => {
    //dao.get_model_items(db_accessor.models.Coursework, get_courseworks_by_course_id).then(courseworks => {
        //for(var i = 0; i < courseworks.length; i++) {
            for(var i = 0; i < student[0].courseworks.length; i++) {
            options += '<option value="'+courseworks[i].courseworkId+'">'+courseworks[i].courseworkName+'</option>';
        }
    }).catch(error => {
        console.log(error);
    }).finally(()=> {
        console.log(options);
        response.send(options);
    });
});

module.exports = ajaxAddRouter;