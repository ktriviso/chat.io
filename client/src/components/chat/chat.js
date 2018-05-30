import React, { Component } from 'react'
import socket from '../../socket/api'
import Header from '../header/userHeader'
import NewRoom from '../room/newRoom'
import './chat.css'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      room: '',
      isModalOpen: false,
      currentUser: this.props.history.location.state.data
    }
  }

  componentDidMount(){
    // i needed a way to get the current user, but the state kept getting overridden by the most recently added users: console.log(this.props.history.location.state.data)
    const _this = this
    const { message } = this.state

    // gets all the users and sets this.state.users but im not actually using this
    // socket.on('get users', function(users) {
    //   // _this.setState({ users: [..._this.state.users, users] })
    // })

    // this appends user names to the active tab
    socket.on('new user added', function(user){
      const list_group = document.querySelector('.list-group')
      const li = document.createElement("li")
      li.innerHTML = user
      list_group.appendChild(li)
    })

    socket.on('new message', function(msg) {
      console.log('im the message: ', msg)
      const users_chats = document.querySelector('.users_chats')
      const li = document.createElement("li");
      li.innerHTML = `<span>${msg.username}</span>  ${msg.message}`
      users_chats.appendChild(li)
      document.querySelector("#message").value=''
      document.querySelector("#message").focus()
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
          <span><NewRoom /></span>
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
