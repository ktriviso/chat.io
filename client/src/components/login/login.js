import React, { Component } from 'react'
import socket from '../../socket/api'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './login.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }
  }

  componentDidMount(){
    socket.on('new user', function(user) {
      console.log('new user here', user)
    })
  }

  submitLogin = e => {
    e.preventDefault()
    const { userName, password } = this.state
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
    console.log(userLoggedIn)
    // if the user is logged in, set localStorage
    localStorage.setItem('userName', this.state.userName);
    localStorage.setItem('password', this.state.password);
    // send to the backend, sever.js does not have access to the url or localStorage
    fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: this.state.userName,
          password: this.state.password,
        })
    })
    .then(res => {
       console.log(res)
       const user = res
       console.log(user)

    })
    .catch(err => console.log(err))

    this.props.history.push(`/chat/`);
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
        <p><Link to="/register"><li>Not a member? Register Here</li></Link></p>
      </div>
    )
  }
}
