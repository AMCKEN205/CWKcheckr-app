const mongoose = require("mongoose");
const models = require("./models")
require("dotenv").config()

class DAO {

    constructor(){    
        // Mongo server used to host the applications MongoDB.
        this.db_url = process.env.MONGODB_URI
    }
   

    /* Functional methods - expose the classes concrete functionality */

    add_student(studentNo, name, username, passwordHash, courseworks, courses) {
        // Add new students to the database
        
        this._init_db();
        
        var student_to_add = new models.Student({
            studentNo : studentNo,
            name : name,
            username : username,
            passwordHash : passwordHash,
            courseworks : courseworks,
            courses : courses
        });

        student_to_add.save()
        .then(() => {
            console.log(`student ${student_to_add.studentNo} saved to students collection.`);
        })
        .catch(err => {
            console.log(err.message)
            console.log(`student ${student_to_add.studentNo} failed to save to students collection, see error above.`);
        })
        .then(() => {
            // Always close the database connection, 
            // regardless as to the success or failure of the operation
            this._close_db_connection();
        });
    }

    add_course(courseId, courseName, courseTeacher, courseDescription) {
        // Add new students to the database
        
        this._init_db();
        
        var course_to_add = new models.Course({
            courseId : courseId,
            courseName : courseName,
            courseTeacher : courseTeacher,
            courseDescription : courseDescription
        });

        course_to_add.save()
        .then(() => {
            console.log(`course ${course_to_add.courseId} saved to courses collection.`);
        })
        .catch(err => {
            console.log(err.message)
            console.log(`course ${course_to_add.courseId} failed to save to courses collection, see error above.`);
        })
        .then(() => {
            // Always close the database connection, 
            // regardless as to the success or failure of the operation
            this._close_db_connection();
        });
    }

    add_coursework(courseworkId, courseId, CourseworkName, CourseworkDescription, dueDate) {
        // Add new students to the database
        
        this._init_db();
        
        var coursework_to_add = new models.Coursework({
            courseworkId : courseworkId,
            courseId : courseId,
            CourseworkName : CourseworkName,
            CourseworkDescription : CourseworkDescription,
            dueDate : dueDate
        });

        

        coursework_to_add.save()
        .then(() => {
            console.log(`course ${coursework_to_add.courseId} saved to courses collection.`);
        })
        .catch(err => {
            console.log(err.message)
            console.log(`course ${coursework_to_add.courseId} failed to save to courses collection, see error above.`);
        })
        .then(() => {
            // Always close the database connection, 
            // regardless as to the success or failure of the operation
            this._close_db_connection();
        });
    }

    get_model_items(model) {
        // Gets the entries for the passed in model.
        // e.g. if the student model is passed in gets the student entries.
        
        this._init_db();
        return new Promise((resolve, reject) => {
            model.find({})
            .then(function(entries) {
                resolve(entries);
            })
            .catch(function(err) {
                console.log(err);
                console.log(`Failed to list model entries, see error above.`);
                reject(null);
            })
            .then(() => {
                // Always close the database connection, 
                // regardless as to the success or failure of the operation
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
            // Disconnect failure
            console.log(console.log(err.message));
            console.log("Application database disconnect failure! See error details above.");
        });
    }
     
}

// Export data models from the DAO so app data interaction 
// can be managed within a single centralised class.
module.exports = {
    DAO : DAO, 
    models : models
}