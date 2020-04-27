//******************* For end point /api/edit-coursework
const editCourseworkRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

//TODO: Add functionality which updates an existing coursework object in the Student collection

editCourseworkRouter.post('/', function (request, response) {
  //find coursework in student Obj
  //make everything same except what is being changed
  //update the coursework
  //if successful, redirect them to a page where it shows that coursework updated or home
  const body = request.body
  const courseworkId = body.courseworkSelect
  //TODO change all body.studentNo to the appopriate thing
  const studentNo = body.studentNo || request.session.passport.user


  if (!courseworkId || !studentNo) {//check request has courseworkId and studentNo (or sessionId)
    console.log(("----------------------courseworkId " + courseworkId + "studentNo " + studentNo))
    response.status(405)
    response.send("courseworkId or sessionId missing.")
    return
  }

  //since only the courseworks in the Students Obj is updated, I have to find
  //that student and make the update there. As opposed to doing it in the global 
  //coursework object. The global one upon initialising doesnt get updated 
  //anymore. 
  dao.get_model_items(db_accessor.models.Student, { "studentNo": studentNo })
    .then(students => {
      let cwk = students[0].courseworks.find(elem => elem.courseworkId === courseworkId)
      //console.log("the found cwk----------------------------",cwk)

      let update = {
        //if the request body has the new value use it, if not then use the original
        courseworkName: cwk.courseworkName,
        courseworkDescription: cwk.courseworkDescription,
        dueDate: cwk.dueDate,
        //we add new milestones to existing milestones if the request has them or keep the originals
        milestones: body.milestones ? cwk.milestones.concat(body.milestones) : cwk.milestones,
        completionDate: body.completionDate ? body.completionDate : cwk.completionDate,
        //only completionDate, milestones can be changed 
      }
      //console.log('------------------------------the new coursework', update)
      //edit_coursework_in_student(studentNo, courseworkId, courseworkName, completionDate, milestones, dueDate)
      //dao.edit_coursework_in_student(studentNo, courseworkId, update.courseworkName, update.completionDate, update.milestones, update.dueDate)
    })

  //TODO: Redirect to page that shows the updated cwk or all cwks
  response.status(202)
  response.redirect("/")
  //response.send(`successfully update coursework ${courseworkId} within student ${studentNo} courseworks collection.`)
});

module.exports = editCourseworkRouter;