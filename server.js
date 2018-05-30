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
let currentUser = ''

app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// receiving the fetch call from the login on the front end


app.post('/register', (req, res) => {
  let user = req.body
  console.log(req.body.username)
  // Add to database  or see if exists already
  db.addUser(req.body.username, req.body.password)
  db.createReference(1, req.body.username)

  res.send(user)
})

// always server index.html from any route
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

// const updateUserNames = () => {
//   io.emit('get users', users)
//   console.log(users)
//   console.log('checking shit')
// }

io.on('connection', socket => {
  connections.push(socket)
  console.log('connected: %s sockets connected', connections.length)

  db.viewChatroom(1).then(data => {
    console.log(data)
    io.emit('new room', data)
  })

  socket.on('new user', (user, callback) => {
    callback(true, user)
    username = user.userName
    users.push(username)
    currentUser = username
    console.log(user)
    io.emit('user profile', user)
    io.emit('new user added', username)
    // updateUserNames()
  })

  socket.on('check user', (data) => {
    console.log('chceking me')
    console.log(data)
    db.getUser(data.userName, data.password)
      .then((user) => {
        io.emit('auth', user)
      })
      .catch((err) => {
        io.emit('auth' , null)
      })

    // io.emit('auth', db.getUser(data.userName, data.password))
  })

  socket.on('send message', data => {
    db.storeMessage(data.message, data.username, data.chatroom)
    io.emit('new message', data)
  })

  io.on('disconnect', () => {
    users.splice(users.indexOf(socket.username), 1)
    updateUserNames()
    connections.splice(connections.indexOf(socket), 1)
    console.log('disconnected: %s sockets connected', connections.length)
    socket.broadcast.to(socket.chatroom).emit('user disconnect', name);
  })
})

server.listen(process.env.PORT || 3001)
