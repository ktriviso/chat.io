const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const router = './router'
const db = require('./models/model');
const bodyParser = require('body-parser');

const users = []
const connections = []

// where to find all static files
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// receiving the fetch call from the login on the front end
const user = ''
// app.post('/login', (req, res) => {
//   user = req.body.username
//   console.log(req.body.username)
//   // Add to database  or see if exists already
//     res.send(user)
// })

// always server index.html from any route
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

const updateUserNames = () => {
  io.emit('get users', users)
  console.log(users)
}

io.on('connection', socket => {
  connections.push(socket)
  console.log('connected: %s sockets connected', connections.length)

  socket.on('send message', data => {
    db.storeMessage(data.message, data.username, data.chatroom)
    console.log('saved message information:', data)
    io.emit('new message', data)
  })

  socket.on('new user', (userName, callback) => {
    console.log(userName)
    console.log(callback)
    callback(true)
    socket.username = userName
    users.push(socket.username)
    updateUserNames()
  })

  io.on('disconnect', () => {
    users.splice(users.indexOf(socket.username), 1)
    updateUserNames()
    connections.splice(connections.indexOf(socket), 1)
    console.log('disconnected: %s sockets connected', connections.length)
  })
})

server.listen(process.env.PORT || 3001)
