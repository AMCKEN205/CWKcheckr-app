//Logic for all calls to api/user will be handled here
const usersRouter = require('express'). Router()
const bcrypt = require('bcrypt')
const users = require('./testUsers')


// GET all users
usersRouter.get('/', (req, res) => {
  res.json(users)
})

// add new user
usersRouter.post('/', async (req,res) => {
  const body = req.body
  //console.log(body)
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
  const newUser =   {
    id: users.length + 1,
    name: body.name,
    username: body.username,
    password: passwordHash,
    courseworks: [],
    courses: []
  }

  users.push(newUser);
  res.json(newUser)
})

module.exports = usersRouter;