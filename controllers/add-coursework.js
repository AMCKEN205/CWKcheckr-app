//**************for the endpoints /api/add-coursework
const addCourseworkRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

//TODO: Add functionality which adds a new coursework object to the Student collection

addCourseworkRouter.post('/', function(request, response) {// add coursework and add it to a course and attach it to a student
  const body = request.body
  //TODO change all body.studentNo to the appopriate thing
  const studentNo = body.studentNo || request.session.passport.user

  //initialise the parameters necessary to create a coursework
  const courseId= body.courseSelect,  courseworkId= body.courseworkSelect

  //check coursework has name, course and courseworkDescription //add the coursework // if successful, redirect them to a page where it shows that coursework added or home
  if (!body.courseworkId ||!courseId ||!studentNo) {
    console.log(("----------------------studentNo " + studentNo + "courseworkId " +courseworkId + "courseId " +courseId))
    response.status(405)
    response.send("studentNo (sessionId), courseworkId and courseId are required.")
    return
  }

  //add that the coursework to the student
  //add_coursework_to_student(studentNo, courseId, courseworkId) 
  console.log(`add_coursework_to_student(${studentNo}, ${courseId}, ${courseworkId})`)
  dao.add_coursework_to_student(studentNo, courseId, courseworkId)
 
  response.status(201)
  response.redirect('/')
    
});


module.exports = addCourseworkRouter;