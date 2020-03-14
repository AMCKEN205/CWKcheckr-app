const DAO = require('./db-accessor');

dao = new DAO()

dao.init_db()

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
