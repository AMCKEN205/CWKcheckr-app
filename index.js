const express = require('express');
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const viewsRouter = require('./controllers/views')
const apiRouter = require('./controllers/api')
const middleware = require('./utils/middleware')
const passport = require('passport');
const auth = require('./auth/auth');
const session = require('express-session');

var mustache = require('mustache-express') 
path = require('path');
const app = express();

/********* Needed for viewsRouter to work****************/
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, 'Views'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/Resources'));

app.use(session({ secret: "It's a secret to everyone!", resave: false, saveUninitialized: false }));

auth.init(app);

app.use(middleware.requestLogger)//log requests
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api', apiRouter)
app.use('/', viewsRouter)

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`)
})