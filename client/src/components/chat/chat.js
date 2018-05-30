import React, { Component } from 'react'
import socket from '../../socket/api'
import Header from '../header/userHeader'
import './chat.css'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      users: [],
      room: '',
      currentUser: this.props.history.location.state.data
    }
  }

  /*
    This method emits a socket.io event to the backend
    Node + Express server
  */
  componentDidMount(){
    console.log(this.props.history.location.state.data)
    const _this = this
    const { message } = this.state

    // gets all the users and sets this.state.users
    socket.on('get users', function(users) {
      console.log(users)
      _this.setState({ users: [..._this.state.users, users] })
      console.log(_this.state.users)
    })

    // this appends user names to the active tab
    socket.on('new user added', function(user){
      console.log(user)
      const list_group = document.querySelector('.list-group')
      const li = document.createElement("li")
      li.innerHTML = user
      list_group.appendChild(li)
    })


    socket.on('new message', function(msg) {
      console.log('im the message: ', msg)
      const users_chats = document.querySelector('.users_chats')
      const li = document.createElement("li");
      console.log(_this.state.currentUser)
      li.innerHTML = `<span>${msg.username}</span>  ${msg.message}`
      users_chats.appendChild(li)
    })


    socket.on('new room', function(room) {
      console.log('im the room', room)
      _this.setState({
        room: room.name
      })
    })
  }

  sendMessage = e => {
    e.preventDefault()

    const { message, currentUser } = this.state
    console.log(currentUser)
    const data = {
      message: message,
      username: currentUser,
      chatroom: 'main'
    }
    socket.emit('send message', data)

  }

  updateMessage = e => {
    e.preventDefault()
    this.setState({
      message: e.target.value
    })
  }

  render() {


    return (
      <div>
        <Header />


        <div className="chat_component">
        <div className="rooms">
        {this.state.room}
          <span>+</span>
        </div>
        <div className="active">
          <section>
            <h3>online users</h3>
            <ul className="list-group" id="users"></ul>
          </section>
        </div>
        <div className="chat">
          <ul className="users_chats">

          </ul>
          <form className="" id="messageForm" onSubmit={this.sendMessage}>
            <textarea id="message" value={this.state.message} onChange={this.updateMessage} />
            <button className="btn" type="submit"><span>Send Message</span></button>
          </form>
        </div>
        </div>

      </div>
    )
  }
}

export default Chat

// <div className="messages" />
// <div className="chat" id="chat" />

// <script>
//     $(function() {
//       var socket = io.connect();
//       var messageForm = $('#messageForm')
//       var message = $('#message')
//       var chat = $('#chat')
//       var chatArea = $('#chatArea')
//       var userFormArea = $('#userFormArea')
//       var userForm = $('#userForm')
//       var users = $('#users')
//       var username = $('#username')

//       messageForm.submit(function(e) {
//         e.preventDefault()
//         socket.emit('send message', message.val())
//         message.val('')
//       })

//       socket.on('new message', function(data) {
//         chat.append('<div class="well"><strong>' + data.user + '</strong>' + data.msg + '</div>')
//       })

//       userForm.submit(function(e) {
//         e.preventDefault()
//         socket.emit('new user', username.val(), function(data) {
//           if (data) {
//             userFormArea.hide()
//             chatArea.show()
//           }
//         })
//         username.val('')
//       })

//       socket.on('get users', function(data) {
//         var html = '';
//         for (i = 0; i < data.length; i++) {
//           html += '<li>' + data[i] + '</li>'
//         }
//         users.html(html)
//       })
//     })
//   </script>
