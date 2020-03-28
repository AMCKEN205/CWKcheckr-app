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
            console.log(err)
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
            console.log(err)
            console.log(`course ${course_to_add.courseId} failed to save to courses collection, see error above.`);
        })
        .then(() => {
            // Always close the database connection, 
            // regardless as to the success or failure of the operation
            this._close_db_connection();
        });
    }

    add_coursework(courseworkId, courseId, courseworkName, courseworkDescription, dueDate) {
        // Add new students to the database
                
        var coursework_to_add = new models.Coursework({
            courseworkId : courseworkId,
            courseId : courseId,
            courseworkName : courseworkName,
            courseworkDescription : courseworkDescription,
            dueDate : dueDate
        });
        
        var get_course_ids_find_doc = {"courseId" : {$in : [
            courseId
            ]}
        };
        var get_course_ids_projection_doc = {_id : 0, courseId : 1}
        this.get_model_items(models.Course, get_course_ids_find_doc, get_course_ids_projection_doc)
            .then(courseIds => {
                if (courseIds.length == 0){
                    throw "Attempted to add a coursework not linked to an existing course!";
                }
                else{
                    this._init_db();
                }
            })
            .then(() => {
                coursework_to_add.save();
                console.log(`coursework ${coursework_to_add.courseId} saved to courseworks collection.`);
            })
            .catch(err => {
                console.log(err)
                console.log(`coursework ${coursework_to_add.courseId} failed to save to courseworks collection, see error above.`);
            })
            .then(() => {
            // Always close the database connection, 
            // regardless as to the success or failure of the operation
            var connected_state = 1
            var connecting_state = 2
            if (mongoose.connection.readyState == connected_state || mongoose.connection.readyState == connecting_state)
                this._close_db_connection();
            });        
    }

    get_model_items(model, query_doc={}, projection_doc=null) {
        // Gets all the entries for the passed in model.
        // e.g. if the student model is passed in gets the student entries.
        
        // query_doc == mongo query used to find objects containing specific field values.
        // {} == don't apply a query.

        // projection_doc == mongo query used to find specific fields of model
        // db entries found. Null == find every item with every field.
        this._init_db();
        return new Promise((resolve, reject) => {
            model.find(query_doc, projection_doc)
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
            console.log(console.log(err));
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
            console.log(console.log(err));
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