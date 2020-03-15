const mongoose = require("mongoose");
const mongo_spawn = require('child_process').spawn;
const schemas = require("./schemas")
const models = require("./models")


class DAO {

    constructor(){    
        // Mongo server used to host the applications MongoDB.
        this.pipe = null
        this.db_initalised = false
    }
   

    /* Functional methods - expose the classes concrete functionality */

    init_db (){
        // Initalise the connection to the application mongoDB database

        // TODO: change localhost to remote hostname IF we decide to host on remote server
        
        // Define mongoDB attributes used.
        const hostname = "localhost";
        const connect_port = "1337";
        const db_name = "app_db";
        const db_url = `mongodb://${hostname}:${connect_port}/${db_name}`;        
        this._init_mongo()
        
        mongoose.connect(db_url, (err, db) => {
        
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
        mongoose.connection.close((err, db) => {
        
            let disconnect_success = !err
            
            if(disconnect_success) {
                console.log("Application database disconnect success!");
                this.db_initalised = false    
            }
            else {
                console.log(console.dir(err))
                console.log("Application database disconnect failure! See error details above.")
                }
    
            });
    }

    /* 
    Utility methods - breakdown the concrete methods logic into smaller components, 
    these shouldn't be exposed publically but I'm not sure theres a way to enforce access control
    within JS other than function/method nesting, which looks awful/does more harm than good. 
    _ used to indicate a private method instead (taken from python). 
    */

    _init_mongo () {
        // Startup a mongo server instance.
        // __dirname gets the directory the script is held within, then just need to specify the datbase dir.
        var db_dir = `${__dirname}/database`
        this.pipe = mongo_spawn('mongod', [`--dbpath=${db_dir}`, '--port', '1337'])
    }
    
}

module.exports = DAO;