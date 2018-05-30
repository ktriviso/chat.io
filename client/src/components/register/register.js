import React, { Component } from 'react'
import socket from '../../socket/api'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './register.css'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }
  }

  submitLogin = e => {
    e.preventDefault()
    const { userName, password } = this.state
    localStorage.setItem('userName', this.state.userName);
    localStorage.setItem('password', this.state.password);
    socket.emit('new user', { userName, password }, this.socketCallback)
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

  socketCallback = userLoggedIn => {
    fetch('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.state.userName,
          password: this.state.password,
        })
    })
    .then(res => {
       console.log(res.status)
    })
    .catch(err => console.log(err))

    this.props.history.push({
      pathname: `/chat`,
      state: { data: this.state.userName }
    });
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
        <p><Link to="/login"><li>Already a member? Login Here</li></Link></p>
      </div>
    )
  }
}
