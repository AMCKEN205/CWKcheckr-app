const db_accessor = require('./db-accessor');

dao = new db_accessor.DAO();

dao.get_model_items(db_accessor.models.Student).then(students => {
    console.log(students)
});

dao.get_model_items(db_accessor.models.Course).then(courses => {
    console.log(courses)
});

dao.get_model_items(db_accessor.models.Coursework).then(courseworks => {
    console.log(courseworks)
});

dao.add_student(
    1, 
    "Bob", 
    "Bobby", 
    "1234", 
    [
        {
            parent_course_no : 1234, 
            coursework_title : "Web dev cwk 1", 
            coursework_description : "the first coursework"
    }
    ],
    [
        {
            course_no : 1234,
            course_name : "Web Platform Development 2"
        }
    ]
    
    );

dao.add_course(
    1,
    "test course",
    "test teacher",
    "test description"
)

//should fail
dao.add_coursework(
    1,
    2,
    "Test coursework",
    "A test coursework",
    new Date(2020, 07, 04)
)

// should pass
dao.add_coursework(
    1,
    1,
    "Test coursework",
    "A test coursework",
    new Date(2020, 07, 04)
)
