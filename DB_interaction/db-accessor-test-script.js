const db_accessor = require('./db-accessor');

dao = new db_accessor.DAO();

dao.get_model_items(db_accessor.models.Student).then(students => {
    console.log(students)
});

dao.get_model_items(db_accessor.models.Course).then(courses => {
    console.log(courses)
});

// dao.add_student(
//     1, 
//     "Bob", 
//     "Bobby", 
//     "1234", 
//     [
//         {
//             parent_course_no : 1234, 
//             coursework_title : "Web dev cwk 1", 
//             coursework_description : "the first coursework"
//     }
//     ],
//     [
//         {
//             course_no : 1234,
//             course_name : "Web Platform Development 2"
//         }
//     ]
    
//     );

