const loginRouter = require('express').Router()
const users = require('./testUsers');
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {
  const body = req.body

  //TODO Alexander can we change the name in db schema from password to passwordHash
  let theUser = users.find(u => u.username === body.username)
  const passwordCorrect = theUser === null ? false
  :await bcrypt.compare(body.password, theUser.password)

  //if user doesnt exist or password is wrong 
  /*if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }*/
  if (!passwordCorrect) {//delete this for the above version when db is connected
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  console.log("password was correct")
  res.status(200).send("<p>Yes the password matched</p>")

})

module.exports = loginRouter