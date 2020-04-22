//******************* For end point /api/edit-coursework
const editCourseworkRouter = require('express').Router()
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();

//TODO: Add functionality which updates an existing coursework object in the Student collection

editCourseworkRouter.post('/', function(request, response) {
  //find coursework in student Obj
  //make everything same except what is being changed
  //update the coursework
  //if successful, redirect them to a page where it shows that coursework updated or home
  const body = request.body
  const courseworkId= body.courseworkId
  //TODO change all body.studentNo to the appopriate thing
  const studentNo = body.studentNo || request.session.passport.user

   //check request has courseworkId and studentNo (or sessionId)

   if (!courseworkId ||!studentNo) {
    console.log(("----------------------courseworkId " + body.courseworkId + "studentNo " +studentNo))
    response.status(405)
    response.send("courseworkId or sessionId missing.")
    return
  }

  //since only the courseworks in the Students Obj is updated, I have to find
  //that student and make the update there. As opposed to doing it in the global 
  //coursework object. The global one upon initialising doesnt get updated 
  //anymore. 
  dao.get_model_items(db_accessor.models.Student, {"studentNo": studentNo})
  .then(students =>{
    //console.log("students ------------------------" + students)
    let cwkArr = students[0].courseworks
    //console.log(cwkArr)

 
     cwkArr.forEach(c => {
      //console.log(c)
      console.log(Object.keys(c))
      console.log(Object.keys(c).map(str => str.split('').map(ch => ch.charCodeAt(0)).every(ch => ch <= 127 && ch >= 10)));
      /*console.log(c.courseworkName)
      console.log(c.courseworkI)
      console.log("-*-*-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*-*-*-")
     console.log(toString(c.courseworkId))
      console.log(c.courseworkName)
      console.log(c.courseworkDescription)
      //console.log(c.courseworkName === courseworkName)
      console.log(`${c.courseworkId} !== ${courseworkId}`)*/
    })
    /**.find(elem=> {
      console.log("found elem --------------------" +elem)
      console.log("elem.courseworkId and courseworkId are ----------------------------"+ elem.courseworkId + " " +courseworkId)
      return toString(elem.courseworkId) === toString(courseworkId)
    }) */
    //console.log("the found cwk----------------------------",cwk)
    
    /*let update = {
      //if the request body has the new value use it, if not then use the original
      courseworkName: body.courseworkName ? body.courseworkName : cwk.courseworkName,
      courseworkDescription: body.courseworkDescription ? body.courseworkDescription : cwk.courseworkDescription,
      dueDate :  body.dueDate ? body.dueDate : cwk.dueDate,
      //we add new milestones to existing milestones if the request has them or keep the originals
      milestones: body.milestones ? cwk.milestones.concat(body.milestones) : cwk.milestones,
      completionDate: body.completionDate ? body.completionDate : cwk.completionDate,
      //only completionDate, milestones can be changed 
    }
    console.log('------------------------------new coursework', update)
    //edit_coursework_in_student(studentNo, courseworkId, courseworkName, completionDate, milestones, dueDate)
    dao.edit_coursework_in_student(studentNo, courseworkId, update.courseworkName, update.completionDate, update.milestones, update.dueDate)
  */
  })

  //TODO: Redirect to page that shows the updated cwk or all cwks
  response.status(202)
  response.send(`successfully update coursework ${courseworkId} within student ${studentNo} courseworks collection.`)
});

module.exports = editCourseworkRouter;