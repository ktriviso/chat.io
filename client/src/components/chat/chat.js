import React, { Component } from 'react'
import Login from '../login/login'
import socket from '../../socket/api'
import './chat.css'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
    }
  }

  /*
    This method emits a socket.io event to the backend
    Node + Express server
  */
  sendMessage = e => {
    e.preventDefault()
    console.log(e)
    const { message } = this.state
    socket.emit('send message', message)
  }

  updateMessage = e => {
    e.preventDefault()
    this.setState({
      message: e.target.value
    })
  }

  render() {
    const { message } = this.state
    /*
      Waits to hear the response from the server
    */
    socket.on('new message', function(msg) {
      console.log(message)
    })

    return (
      <div className="chat_component">
        <Login />
        <div id="chatArea">
          <h3>online users</h3>
          <ul className="list-group" id="users" />
          <div className="chat" id="chat" />
          <form className="" id="messageForm" onSubmit={this.sendMessage}>
            <textarea id="message" value={this.state.message} onChange={this.updateMessage} />
            <button className="btn" type="submit">
              <span className="message__feedback">Send Message</span>
				    </button>
          </form>
        </div>
        <div className="messages" />
      </div>
    )
  }
}

export default Chat

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
