//Any middleware that we make will be here

//This is middleware that logs each request when it is received
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('----------------------')

  next()
}

module.exports = {
  requestLogger
}