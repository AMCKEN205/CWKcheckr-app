const mongoose = require("mongoose");

// Define the schemas used to persist different application document types within the database.

var student_schema = new mongoose.Schema({
    studentNo: Number,
    name: String,
    username: String,
    passwordHash: String,
    courseworks: [{
                    courseWorkId: Number
                }],
    courses: [{
                courseId: Number
            }]
});

var course_schema = new mongoose.Schema({
    courseId: Number,
    courseName: String,
    courseTeacher: String,
    passwordHash: String,
    courseDescription: String,
    completionDate: Date
});

var coursework_schema = new mongoose.Schema({
    courseworkId: Number,
    courseId: Number,
    courseName: String,
    courseTeacher: String,
    passwordHash: String,
    courseDescription: String,
    completionDate: Date
});

module.exports = {student_schema : student_schema, course_schema : course_schema}