//response handlers for all of frontend.
const viewsRouter = require('express').Router()
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const db_accessor = require('../DB_interaction/db-accessor')
dao = new db_accessor.DAO();


viewsRouter.get("/login", function (request, response) {
    //console.log(request.session.passport.user);
    if(request.query.fail === 'true') {
        response.render("login", {
            "Title" : "Login Screen",
            "page" : "CWKCheckr Login",
            "error" : "Incorrect Username/Password!"
        });
    }
    else {
        response.render("login", {
            "Title" : "Login Screen",
            "page" : "CWKCheckr Login"
        });
    }
});

viewsRouter.get("/logout", function(request, response) {
    request.logout();
    response.redirect("/");
})

viewsRouter.get("/register", function (request, response) {
    if(request.query.passmatch === 'false') {
        response.render("register", {
            "Title" : "Sign Up Screen",
            "page" : "CWKCheckr Register",
            "pass-match" : "Passwords do not match!"
        });
        return;
    }
    else if(request.query.userexists === 'true') {
        response.render("register", {
            "Title" : "Sign Up Screen",
            "page" : "CWKCheckr Register",
            "user-exists" : "This username is already taken! Please try another."
        });
        return;
    }
    else if(request.query.dberror === 'true') {
        response.render("register", {
            "Title" : "Sign Up Screen",
            "page" : "CWKCheckr Register",
            "db-error" : "Registration failed...contact James, Alex or Ohe!"
        });
        return;
    }
    else{
        response.render("register", {
            "Title" : "Sign Up Screen",
            "page" : "CWKCheckr Register"
        });
    }
});

viewsRouter.get("/reg-success", function(request, response) {
    response.render("reg-success");
});

//viewsRouter.get('/', ensureLoggedIn('/login'), function (request, response) {
viewsRouter.get('/', function (request, response) {
    var session_id = request.session.passport.user;
    var loggedInStudent = {
        "studentNo" : session_id
    };
    dao.get_model_items(db_accessor.models.Student, loggedInStudent).then(students => {
        console.log(students);
        console.log(session_id);
        var student_name = "";
        var student_courses = [];
        var student_courseworks = [];
        for(var i = 0; i < students.length; i++) {
            if(students[i].studentNo === session_id) {
                student_name = students[i].name;
                student_courses = students[i].courses;
                student_courseworks = students[i].courseworks;
                console.log(student_courseworks[0].dueDate);
                console.log(student_courseworks);
                break;
            }
        }
        response.render("home", {
            "page" : "CWKCheckr Home Page",
            "Student" : student_name,
            "Courses" : student_courses,
            "Coursework" : student_courseworks
        });
    }).catch(err => {
        console.log(err);
        console.log("Could not retrieve student, see error above.");
        response.render("home", {
            "page" : "CWKCheckr Home Page",
            "Student" : [],
            "Courses" : [],
            "Coursework" : []
        });
    });
});

viewsRouter.get("/view-coursework", ensureLoggedIn('/login'), function (request, response) {
    var session_id = request.session.passport.user;
    var loggedInStudent = {
        "studentNo" : session_id
    };
    dao.get_model_items(db_accessor.models.Student, loggedInStudent).then(students => {
        complete_courseworks = [];
        incomplete_courseworks =[];
        for (var i = 0; i < students.length; i++) {
            for(var j = 0; j < students[i].courseworks.length; j++) {
                if(students[i].courseworks[j].completionDate != null) {
                    console.log(students[i].courseworks[j]);
                    complete_courseworks.push(students[i].courseworks[j]);
                } else {
                    console.log(students[i].courseworks[j]);
                    incomplete_courseworks.push(students[i].courseworks[j]);
                }
            }
        }
        response.render("view-coursework", {
            "page" : "CWKCheckr View Coursework",
            "Complete Coursework" : complete_courseworks,
            "Incomplete Coursework" : incomplete_courseworks
        });
    }).catch(error => {
        console.log(error);
        console.log("could not retrieve student, see error above");
        response.render("view-coursework", {
            "page" : "CWKCheckr View Coursework",
            "Complete Coursework" : [],
            "Incomplete Coursework" : []
        }); 
    });
    
});

viewsRouter.get("/add-coursework", ensureLoggedIn('/login'), function(request, response) {
    var session_id = request.session.passport.user;
    var loggedInStudent = {
        "studentNo" : session_id
    };
    dao.get_model_items(db_accessor.models.Student, loggedInStudent).then(students => {
        courses = [];
        for (var i = 0; i < students.length; i++) {
            console.log(students[i].courses);
            courses = students[i].courses;
        }
            
        response.render("add-coursework", {
            "page" : "Add Coursework",
            "courses" : courses
        });
    }).catch(error => {
        console.log(error);
        console.log("could not retrieve student, see error above");
        response.render("add-coursework", {
            "page" : "Add Coursework",
            "courses" : []
        }); 
    });
});

viewsRouter.get("/edit-coursework", ensureLoggedIn('/login'), function(request, response) {
    var session_id = request.session.passport.user;
    var loggedInStudent = {
        "studentNo" : session_id
    };
    dao.get_model_items(db_accessor.models.Student, loggedInStudent).then(students => {
        courseworks = [];
        for (var i = 0; i < students.length; i++) {
            console.log(students[i].courseworks);
            courseworks = students[i].courseworks;
        }
            
        response.render("edit-coursework", {
            "page" : "Edit Coursework",
            "courseworks" : courseworks
        });
    }).catch(error => {
        console.log(error);
        console.log("could not retrieve student, see error above");
        response.render("edit-coursework", {
            "page" : "Edit Coursework",
            "courseworks" : []
        }); 
    });
});

viewsRouter.get("/remove-coursework", ensureLoggedIn('/login'), function(request, response) {
    var session_id = request.session.passport.user;
    var loggedInStudent = {
        "studentNo" : session_id
    };
    dao.get_model_items(db_accessor.models.Student, loggedInStudent).then(students => {
        courseworks = [];
        for (var i = 0; i < students.length; i++) {
            console.log(students[i].courseworks);
            courseworks = students[i].courseworks;
        }
            
        response.render("remove-coursework", {
            "page" : "Remove Coursework",
            "courseworks" : courseworks
        });
    }).catch(error => {
        console.log(error);
        console.log("could not retrieve student, see error above");
        response.render("remove-coursework", {
            "page" : "Remove Coursework",
            "courseworks" : []
        }); 
    });;
});

// 404 catch-all handler (bad request)
viewsRouter.use(function (req, res, next) {
    res.type('text/plain');
    res.status(404);
    res.send(`404, Content not found.
    \nAlso Hi from Ohe, Alexander and James`);
});

// 500 error handler (server/db error)
viewsRouter.use(function (err, req, res, next) {
    console.error(err.stack); 
    res.status(500); 
    res.send('500 Internal server error');
})



module.exports = viewsRouter