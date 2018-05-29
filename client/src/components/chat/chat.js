import React, { Component } from 'react'
import socket from '../../socket/api'
import Header from '../header/header'
import './chat.css'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      message: '',
      allChats: [],
      users: []
    }
  }

  /*
    This method emits a socket.io event to the backend
    Node + Express server
  */
  sendMessage = e => {
    e.preventDefault()
    console.log(e)
    const { message, allChats } = this.state
    const data = {
      message: message,
      username: localStorage.getItem('userName'),
      chatroom: 'main'
    }
    socket.emit('send message', data)
    let newChats = allChats
    newChats.push(message)
    this.setState({
      allChats: newChats
    })
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
      console.log('im the message: ', msg)


      // const ul = document.getElementById("users_chats");
      // const li = document.createElement("li");
      // li.appendChild(document.createTextNode(message));
      // console.log(this.state.allChats)
      // chat = this.state.allChats.forEach(elem => {
      //   return <li>elem</li>
      // })
    })


    return (
      <div>
        <Header />
        <div className="active">
          <section></section>
          <section>
            <h3>online users</h3>
            <ul className="list-group" id="users" />
          </section>
        </div>

        <div className="chat_component">
          <ul className="users_chats">
            <li>{this.state.allChats}</li>
          </ul>
          <form className="" id="messageForm" onSubmit={this.sendMessage}>
            <textarea id="message" value={this.state.message} onChange={this.updateMessage} />
            <button className="btn" type="submit"><span>Send Message</span></button>
          </form>
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
