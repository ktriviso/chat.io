import React, { Component } from 'react'
import socket from '../../socket/api'

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      userName: ''
    }
  }

  submitUserName = e => {
    e.preventDefault()
    const { userName } = this.state
    socket.emit('new user', userName, this.socketCallback)
  }

  updateUserName = e => {
    e.preventDefault()
    this.setState({
      userName: e.target.value
    })
  }

  socketCallback = userLoggedIn => {
    console.log(userLoggedIn)
  }

  render() {
    const { userName } = this.state

    socket.on('new user', function(user) {
      console.log(user)
    })

    return (
      <div id="userFormArea">
        <form id="userForm" onSubmit={this.submitUserName}>
          <input type="text" value={userName} onChange={this.updateUserName} />
          <br />
          <button  type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
