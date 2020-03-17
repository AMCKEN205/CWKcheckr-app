const mongoose = require("mongoose");
const schemas = require("./schemas")

// define the models used to store schema conforming data
var model_name = "Student"
var collection_name = "Students"
var Student = mongoose.model(model_name, schemas.student_schema, collection_name)

module.exports = {Student : Student}