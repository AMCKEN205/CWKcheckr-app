const mongoose = require("mongoose");
const mongo_spawn = require('child_process').spawn;
const schemas = require("./schemas")
const models = require("./models")
require("dotenv").config()

class DAO {

    constructor(){    
        // Mongo server used to host the applications MongoDB.
        this.db_url = process.env.MONGODB_URI
    }
   

    /* Functional methods - expose the classes concrete functionality */

    add_student(student_no, name, username, passwordHash, courseworks, courses) {
        // Add new students to the database
        
        this._init_db();
        
        var student_to_add = new models.Student({
            student_no : student_no,
            name : name,
            username : username,
            passwordHash : passwordHash,
            courseworks : courseworks,
            courses : courses
        });

        student_to_add.save()
        .then(result => {
            console.log(`student ${student_to_add.student_no} saved to students collection.`);
        })
        .catch(err => {
            console.log(err.message)
            console.log(`student ${student_to_add.student_no} failed to save to students collection, see error above.`);
        })
        .then(() => {
            this._close_db_connection();
        });

    }

    get_students() {
        this._init_db();
        return new Promise((resolve, reject) => {
            models.Student.find({})
            .then(function(students) {
                var studentMap = {};
                students.forEach(function(student) {
                    studentMap[student.student_no] = student;
                });

                resolve(studentMap);
            })
            .catch(function(err) {
                console.log(err);
                console.log(`Failed to list students, see error above.`);
                reject(null);
            })
            .then(() => {
                this._close_db_connection()
            });
        });
    }

    /* Utility methods - Methods to be used privately within the class, denoted by _ */

    _init_db(){
        // Initalise the connection to the application mongoDB database
        mongoose.connect(this.db_url, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            // Database connection success
            console.log("Application database connection success!");
        })
        .catch((err) => {
            // Database connection failure
            console.log(console.log(err.message));
            console.log("Application database connection failure! See error details above.");
        })
    }

    _close_db_connection() {
        // Close the mongo db connection
        mongoose.connection.close()
        .then(() => {
            // Disconnect success
            console.log("Application database disconnect success!");
        })
        .catch((err) => {
            console.log(console.log(err.message));
            console.log("Application database disconnect failure! See error details above.");
        });
    }
     
}

module.exports = DAO;