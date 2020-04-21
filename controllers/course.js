//**************for the endpoints /api/course
//NOT DONE

//add_course(courseId, courseName, courseTeacher, courseDescription)

const courseRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor');
const dao = new db_accessor.DAO


const createCourseId = () => {
  //find the id of the last course and add 1
  let id = dao.get_model_items(db_accessor.models.Course).then(
    cwk => {
      let lastOne = cwk.slice(-1)[0]
      console.log('last course number -----------------', lastOne.courseId)
      //console.log(lastOne.courseId + 1)
      return lastOne.courseId + 1
    }
  )
  return id
}

courseRouter.post('/add', (request, response) => {// add course and add it to a course and attach it to a student
  //Manually adding a course to a student so I can use it to test somethings
  const body = request.body
  //initialise the parameters necessary to create a course
  const courseName= body.courseName,
   courseDescription= body.courseDescription, courseTeacher = body.courseTeacher

  //check course has name, course and courseDescription //add the course // if successful, redirect them to a page where it shows that course added or home
  if (!body.courseName || !courseDescription ) {
    console.log(("-----------------------------------------courseName " + body.courseName + "courseDescription " +courseDescription ))
    response.status(405)
    response.send("Name and description are required.")
    return
  }

  find 
  
  //generate a courseId for it and create the course
  createCourseId().then(courseId => {
    dao.add_course(courseId,courseName, courseTeacher,)
     //TODO: create use the params to add course to student
    dao.add_course_to_student(studentNo, courseId)
  })
 
  response.status(201)
  response.send(`  ${courseName} \n  ${courseDescription} \n ${courseTeacher}`)
});





module.exports= courseRouter