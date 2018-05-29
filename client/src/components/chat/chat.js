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
      room: ''
    }
  }

  /*
    This method emits a socket.io event to the backend
    Node + Express server
  */
  componentDidMount(){
    const username = localStorage.getItem('userName')
    console.log(this.state.users)
    this.setState({ users: [...this.state.users, username] })


    const { message } = this.state

    /*
      Waits to hear the response from the server
    */

    socket.on('new message', function(msg) {
      console.log('im the message: ', msg)
      const users_chats = document.querySelector('.users_chats')
      const li = document.createElement("li");
      users_chats.appendChild(li)
      li.innerHTML = `<span>${msg.username}</span>  ${msg.message}`
    })

    const _this = this
    socket.on('new room', function(room) {
      console.log('im the room', room)
      _this.setState({
        room: room.name
      })
    })

    var user
    socket.on('get users', function(users) {
      console.log('im the user', users)
      const list_group = document.querySelector('.list-group')
      const li = document.createElement("li")
      list_group.appendChild(li)
      users.forEach(elem => {
        console.log(elem.userName)
        li.innerHTML = elem.userName
      })
    })


  }

  sendMessage = e => {
    e.preventDefault()

    const { message } = this.state

    const data = {
      message: message,
      username: localStorage.getItem('userName'),
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
