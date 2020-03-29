const mongoose = require("mongoose");
const models = require("./models")
require("dotenv").config()

class DAO {

    constructor(){    
        // Mongo server used to host the applications MongoDB.
        this.db_url = process.env.MONGODB_URI
        // Indicate the number of running db processes, 
        // used to indicate when to start and stop processes.
        // Means we don't initalise the db connection when it's already running,
        // or delete the db connection when a process still needs to finish.
        this.process_queue = []
    }
   

    /* Functional methods - expose the classes concrete functionality */

    add_student(studentNo, name, username, passwordHash, courseworks, courses) {
        // Add new students to the database
        
        this._init_db();
        // Indicate the add_student process is currently running.
        var add_student_run_indicator = "add_student"
        this.process_queue.push(add_student_run_indicator)
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
            
            // Indicate the add_student process has finished running.
            this.process_queue.shift()

            this._close_db_connection();
        });
    }

    add_course(courseId, courseName, courseTeacher, courseDescription) {
        // Add new students to the database
        
        this._init_db();

        var add_course_run_indicator = "add_course"

        this.process_queue.push(add_course_run_indicator)

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
            
            // Indicate the add course process has finished running.
            this.process_queue.shift()

            this._close_db_connection();
        });
    }

    add_coursework(courseworkId, courseId, courseworkName, courseworkDescription, dueDate) {
        // Add new courseworks to the database
        

        var add_coursework_run_indicator = "add_coursework"

        this.process_queue.push(add_coursework_run_indicator)

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

        return new Promise((resolve,reject) => {
            this.get_model_items(models.Course, get_course_ids_find_doc, get_course_ids_projection_doc)
            .then(courseIds => {
                if (courseIds.length == 0){
                    throw "Attempted to add a coursework not linked to an existing course!";
                }
                else{
                    this._init_db()
                    .then(() => {
                        coursework_to_add.save();
                        console.log(`coursework ${coursework_to_add.courseId} saved to courseworks collection.`);
                        resolve(true)
                    });
                }
            })
            .catch(err => {
                console.log(err)
                console.log(`coursework ${coursework_to_add.courseId} failed to save to courseworks collection, see error above.`);
                reject(false)
            })
            .then(() => {
            // Always close the database connection, 
            // regardless as to the success or failure of the operation
            
            this.process_queue.shift()
            this._close_db_connection();
            });
        })
         
    }

    get_model_items(model, query_doc={}, projection_doc=null) {
        // Gets all the entries for the passed in model.
        // e.g. if the student model is passed in gets the student entries.
        
        // query_doc == mongo query used to find objects containing specific field values.
        // {} == don't apply a query.

        // projection_doc == mongo query used to find specific fields of model
        // db entries found. Null == find every item with every field.
        

        var get_model_items_run_indicator = "get_model_items"

        this.process_queue.push(get_model_items_run_indicator)

        return new Promise((resolve, reject) => {
            this._init_db()
            .then(() => {
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
                    this.process_queue.shift()
                    this._close_db_connection()
                });
            });
        });
    }

    /* Utility methods - Methods to be used privately within the class, denoted by _ */

    _init_db(){
        // Initalise the connection to the application mongoDB database
        
        return new Promise((resolve,reject) => {
            // 
            if (this.process_queue.length > 1){
                resolve(true)
                return
            }
            mongoose.connect(this.db_url, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                // Database connection success
                console.log("Application database connection success!");
                resolve(true)
            })
            .catch((err) => {
                // Database connection failure
                console.log(console.log(err));
                console.log("Application database connection failure! See error details above.");
                reject(false)
            });
        });
    }

    _close_db_connection() {
        if (this.process_queue.length > 0){
            return
        }
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