var express = require('express');
var app = express();
var mustache =  require('mustache-express')
path = require('path');
app.set('port', process.env.PORT || 3000);

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, 'Views'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + '/Resources'));


//response handlers

app.get("/login", function (request, response) {
    response.render("login", {
        "Title" : "Login Screen",
        "page" : "CWKCheckr Login"
    });
});

app.get("/register", function (request, response) {
    response.render("register", {
        "Title" : "Sign Up Screen",
        "page" : "CWKCheckr Register"
    });
});

app.get("/", function (request, response) {
     response.render("home", {
        "page" : "CWKCheckr Home Page",
        "Student" : "James",
        "Courses" : [
            { 
                "Name" : "Web Platform Development 2",
                "Announcements" : [ 
                    {
                        "Announcement" : "Corona virus has killed everyone!"
                    }
                ]
            },
            {
                "Name" : "Cloud Platform Development",
                "Announcements" : [
                    {
                        "Announcement" : "Corona virus is highly exaggerated; come back to Uni, please..."
                    }
                ]
            }
        ],
        "Coursework" : [
            {
                "Course" : "Web Platform Development 2",
                "Name" : "Coursework Tracker",
                "Description" : "Design a web application to track and schedule coursework.",
                "Due Date" : "26/04/20"
            },
            {
                "Course" : "Cloud Platform Development",
                "Name" : "AWS AI Image analysis",
                "Description" : "Build an app in AWS which takes in images and uses machine learning to recognise their contents.",
                "Due Date" : "5/04/20"
            }
        ]
     });
});

app.get("/view-coursework", function (request, response) {
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

// 404 catch-all handler (bad request)
app.use(function (req, res, next) {
    res.type('text/plain');
    res.status(404);
    res.send('404, Content not found');
});
// 500 error handler (server/db error)
app.use(function (err, req, res, next) {
    console.error(err.stack); 
    res.status(500); 
    res.send('500 Internal server error');
})

app.listen(app.get('port'), function() {
    console.log("Application started, press ^C to exit.");
});