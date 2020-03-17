const express = require('express');
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const bodyParser = require('body-parser')
const app = express();

//This is middle ware that logs each request when it is received
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('----------------------')

  next()
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(requestLogger)//log requests
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.get('/', (req, res) => {
  //we will render the homepage here
  res.send('<h1>Hello World!</h1>')
})
app.get('/api', (req, res) => {
  res.send('<p>all server calls will come to api/something. try api/users</p>')
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`)
})