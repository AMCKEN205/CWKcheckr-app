const db_accessor = require('./db-accessor');

dao = new db_accessor.DAO();

//This test should return an empty array named 'students' since 'doesn't exist' is not a real username. 
//The length of this array should be 0 as a result.
// var get_username_find_doc = 
// {
//     "username" : "doesn't exist"
// }
// dao.get_model_items(db_accessor.models.Student, get_username_find_doc).then(students => {
//     console.log(students.length)
// });

dao.get_model_items(db_accessor.models.Student).then(students => {
    for(var i = 0; i < students.length; i++) {
      console.log(students[i].courseworks)
    }
});

//dao.get_model_items(db_accessor.models.Course).then(courses => {
//    console.log(courses)
//});

//dao.get_model_items(db_accessor.models.Coursework).then(courseworks => {
//    console.log(courseworks)
//});

// dao.add_student(
//     1, 
//     "Bob", 
//     "Bobby", 
//     "1234"
//     );

// dao.add_course(
//     1,
//     "test course",
//     "test teacher",
//     "test description"
// )

//should fail
// dao.add_coursework(
//     1,
//     2,
//     "Test coursework",
//     "A test coursework",
//     new Date(2020, 07, 04)
// )

// should pass
// dao.add_coursework(
//     1,
//     1,
//     "Test coursework",
//     "A test coursework",
//     new Date(2020, 07, 04)
// )

// // should fail
// dao.add_course_to_student(1, 2)
// dao.add_course_to_student(2, 1)

// // should pass
 //dao.add_course_to_student(4, 1)

// should fail
//dao.add_coursework_to_student(2, 1, 1)
//dao.add_coursework_to_student(1, 2, 1)
//dao.add_coursework_to_student(1, 1, 2)

// should pass
//dao.add_coursework_to_student(4, 1, 2)

//dao.edit_coursework_in_student(1, 1, "Test coursework", new Date(2021,10,30), ["started!","done!","quickscoped"], new Date(2021,11,30))

//dao.delete_coursework_from_student(4, 2)