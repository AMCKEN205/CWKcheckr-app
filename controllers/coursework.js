//for the endpoints /api/cwk
const courseworkRouter = require('express').Router();
const db_accessor = require('../DB_interaction/db-accessor');
const dao = new db_accessor.DAO

const createCourseWorkId = () => {
  //find the id of the last coursework and add 1
  let id = dao.get_model_items(db_accessor.models.Coursework).then(
    cwk => {
      let lastOne = cwk.slice(-1)[0]
      console.log('last coursework number -----------------', lastOne.courseworkId)
      //console.log(lastOne.courseworkId + 1)
      return lastOne.courseworkId + 1
    }
  )
  return id
}

courseworkRouter.post('/add', (request, response) => { // add coursework and ad it to a course and attach it to a student
  const body = request.body
  //console.log(body)
  /*let courseworkId = createCourseWorkId()
  console.log(`courseworkid -------------------${courseworkId}`)*/
  const courseId= body.courseId, courseworkName= body.courseworkName,
   courseworkDescription= body.courseworkDescription, dueDate = body.dueDate
   //const courseworkId= createCourseWorkId()

  //check coursework has name, course and courseworkDescription //add the coursework // if successful, redirect them to a page where it shows that coursework added or home
  if (!body.courseworkName || !courseworkDescription || !courseId) {
    console.log(("-----------------------------------------courseworkName " + body.courseworkName + "courseworkDescription " +courseworkDescription + "courseId " +courseId))
    response.status(405)
    response.send("Name, description and due date are required.")
    return
  }
  
  createCourseWorkId().then(cwkId => {
    dao.add_coursework(cwkId, courseId, courseworkName, courseworkDescription, dueDate)
  })
  response.status(201)
  response.send(`  ${courseworkName} \n  ${courseworkDescription} \n ${dueDate}`)
});


courseworkRouter.post('/update', (request, response) => {
  //find cousework
  //check coursework has name, course
  //update the coursework
  //if successful, redirect them to a page where it shows that coursework updated or home
  const body = request.body
});

courseworkRouter.post('/remove', (request, response) => {
  //find cousework 
  //delete the coursework
  //if successful, redirect them to a page where it shows that coursework deleted or home
  const body = request.body
});



/**var course_schema = new mongoose.Schema({
    courseId: Number,
    courseName: String,
    courseTeacher: String,
    courseDescription: String
});

var coursework_schema = new mongoose.Schema({
    courseworkId: Number,
    courseId: Number,
    courseworkName: String,
    courseworkDescription: String,
    dueDate: Date
}); */
//********************** Ignore this below. Ohe used it to figure out how the db works********
courseworkRouter.get('/', (request, response) => { 
  dao.get_model_items(db_accessor.models.Coursework).then(
    cwk => {
      //console.log('last coursework number -----------------',cwk.slice(-1)[0].courseworkId)
      //console.log(cwk.slice(-1)[0].courseworkId + 1)
     response.send(cwk)
    }
  )
  
 });

 courseworkRouter.get('/course', (request, response) => { 
  dao.get_model_items(db_accessor.models.Course).then(
    course => {
      console.log(course)
     response.send(course)
    }
  )
  
 });

 courseworkRouter.get('/student', (request, response) => { 
  dao.get_model_items(db_accessor.models.Student).then(
    student => {
      //console.log(student)
      console.log('last students number -----------------',student.slice(-1)[0].studentNo)
      console.log(student.slice(-1)[0].studentNo + 1)
     response.send(student.slice(-1))
    }
  )
  
 });
//********************** Ignore this above. Ohe used it to figure out how the db works********



module.exports = courseworkRouter
