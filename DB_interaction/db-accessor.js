const mongoose = require("mongoose");
const mongo_spawn = require('child_process').spawn;
const schemas = require("./schemas")
const models = require("./models")
require("dotenv").config()

class DAO {

    constructor(){    
        // Mongo server used to host the applications MongoDB.
        this.pipe = null
        this.db_initalised = false
        this.db_url = process.env.MONGODB_URI
    }
   

    /* Functional methods - expose the classes concrete functionality */

    async init_db (){
        // Initalise the connection to the application mongoDB database
        
        mongoose.connect(this.db_url, (err, db) => {
        
            let connection_success = !err
            
            if(connection_success) {
                console.log("Application database connection success!");
                this.db_initalised = true
            }
            else {
                console.log(console.dir(err))
                console.log("Application database connection failure! See error details above.")
                }
    
            });
        }

    add_student(student_no, name, username, password, courseworks, courses) {
        // Add new students to the database
        mongoose.connection.once("open", function () {
            if (this.db_initalised == false){
                console.log("Attempt to add a student without initalising a database connection")
                return
            }
    
            var student_to_add = new models.Student({
                student_no : student_no,
                name : name,
                username : username,
                password : password,
                courseworks : courseworks,
                courses : courses
            });
    
            student_to_add.save(function (err, student) {
                let student_add_success = !err
                
                if (student_add_success){
                    console.log(`student ${student.student_no} saved to students collection.`);
                }
                else{
                    console.log(err);
                    console.log(`student ${student.student_no} failed to save to students collection, see error above.`);
                }
              }); 
        }); 
    }

    list_students() {
    // TODO
    // list all students within the application, 
    // returns a list of student entries.
    var students_found = null;
    mongoose.connection.once("open", function () {
        models.Student.find({}, function(err, students) {
            var studentMap = {};
            
            students.forEach(function(student) {
                studentMap[student.student_no] = student;
            });

            students_found = studentMap

        });
    });
    return students_found;
}

    close_db_connection() {
        // Close the mongo db connection
        mongoose.connection.once("open", function () {
            mongoose.connection.close((err, db) => {
            
                let disconnect_success = !err
                
                if(disconnect_success) {
                    console.log("Application database disconnect success!");
                }
                else {
                    console.log(console.dir(err));
                    console.log("Application database disconnect failure! See error details above.");
                    }
        
                });
            });
    }
    
}

module.exports = DAO;