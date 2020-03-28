const mongoose = require("mongoose");

// Define the schemas used to persist different application document types within the database.

var student_schema = new mongoose.Schema({
    student_no: Number,
    name: String,
    username: String,
    passwordHash: String,
    courseworks: [{parent_course_no: Number, coursework_title: String, coursework_description: String}],
    courses: [{course_no: Number, course_name: String}]
});

module.exports = {student_schema : student_schema}