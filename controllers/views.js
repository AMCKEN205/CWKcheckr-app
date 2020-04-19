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

viewsRouter.get('/', ensureLoggedIn('/login'), function (request, response) {
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
                for(var j = 0; j < student_courseworks.length; j++) {
                    console.log(student_courseworks[j].dueDate);
                    for (var k = 0; k < student_courses.length; k++) {
                        if(student_courseworks[j].courseId === student_courses[k].courseId) {
                            console.log("poo");
                            student_courseworks[j].courseName = student_courses[k].courseName;
                        }
                    }
                }
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
            "Student" : student_name,
            "Courses" : student_courses,
            "Coursework" : student_courseworks
        });
    });
});

viewsRouter.get("/view-coursework", ensureLoggedIn('/login'), function (request, response) {
    response.render("view-coursework", {
        "page" : "CWKCheckr View Coursework",
        "Complete Coursework" : [],
        "Incomplete Coursework" : [
            {
                "Course" : "Web Platform Development 2",
                "Name" : "Coursework Tracker",
                "Description" : "Design a web application to track and schedule coursework.",
                "Milestones" : [
                    {
                        "Name" : "Mockup Screens",
                        "Check" : [{
                            "isChecked" : true
                            }
                        ]
                    },
                    {
                        "Name" : "Initial Prototype",
                    },
                    {
                        "Name" : "Final Submission",
                    }
                ],
                "Due Date" : "26/04/20"
            },
            {
                "Course" : "Cloud Platform Development",
                "Name" : "AWS AI Image analysis",
                "Description" : "Build an app in AWS which takes in images and uses machine learning to recognise their contents.",
                "Milestones" : [
                    {
                        "Name" : "Python Scripts",
                    },
                    {
                        "Name" : "Image Recognition",
                    },
                    {
                        "Name" : "Lambda Functions",
                    },
                    {
                        "Name" : "Final Submission",
                    }
                ],
                "Due Date" : "5/04/20"
            }
        ]
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
    });
});

viewsRouter.get("/edit-coursework", ensureLoggedIn('/login'), function(request, response) {
    response.render("edit-coursework", {
        "page" : "Edit Coursework"
    });
});

viewsRouter.get("/remove-coursework", ensureLoggedIn('/login'), function(request, response) {
    response.render("remove-coursework", {
        "page" : "Remove Coursework"
    });
});

// 404 catch-all handler (bad request)
viewsRouter.use(function (req, res, next) {
    res.type('text/plain');
    res.status(404);
    res.send(`404, Content not found.
    \nAlso Hi from Ohe Alexander and James`);
});

// 500 error handler (server/db error)
viewsRouter.use(function (err, req, res, next) {
    console.error(err.stack); 
    res.status(500); 
    res.send('500 Internal server error');
})



module.exports = viewsRouter