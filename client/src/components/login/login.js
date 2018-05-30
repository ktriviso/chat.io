import React, { Component } from 'react'
import socket from '../../socket/api'
import { Redirect, Route, Router } from 'react-router-dom'

// import './register.css'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }

    this.submitLogin = this.submitLogin.bind(this)
  }

  // sending the server to check for the user in the db
  submitLogin = (e) => {
    e.preventDefault()
    const { userName, password } = this.state
    socket.emit('check user', { userName, password })
    socket.on('auth', function(user){
      if(user !== 'Null'){
        console.log(user, ' you are logged in')
        // this.props.history.push({
        //   pathname: `/chat`,
        //   state: { data: this.state.userName }
        // });

        // window.location = '/chat'
      }
    })
  }

  userNameInput = e => {
    e.preventDefault()
    this.setState({
      userName: e.target.value
    })
  }

  passwordInput = e => {
    e.preventDefault()
    this.setState({
      password: e.target.value
    })
  }

  render() {
    const { userName, password } = this.state

    return (
      <div id="userFormArea">
      <h1>Login Here</h1>
        <form id="userForm" onSubmit={this.submitLogin.bind(this)}>
          <input type="text" value={userName} onChange={this.userNameInput.bind(this)} placeholder="username" />
          <br />
          <input type="text" value={password} onChange={this.passwordInput.bind(this)} placeholder="password" />
          <br />
          <button className="btn" type="submit"><span>Sign Up</span></button>
        </form>
      </div>
    )
  }
}
