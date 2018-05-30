import React, { Component } from 'react';
import Header from '../header/userHeader';
import { Link } from 'react-router-dom'
import socket from '../../socket/api'
import './profile.css';

export default class Profile extends Component {

  constructor(props){
    super(props)
    this.state = {user:null}
  }

  componentDidMount(){

    socket.on('user profile', (function(user) {
      debugger
      this.setState({
        user: user.userName,
      })
    }).bind(this))

  }

  render() {
    console.log('rendered')
      console.log(this.state.user)

    return (
      <div>
      <Header />
        <div className="profile">
          <h1>Welcome <strong>{this.state.user}</strong></h1>
          <h3><i>brought to you by chat.io</i></h3>
          <img src="../public/img/something.jpg"/>
          <ul>
            <li>Edit profile picture</li>
            <li>Edit Username</li>
            <li>Update password</li>
            <Link to="/chat"><li>Go to Chatroom</li></Link>
          </ul>
        </div>
      </div>
    )
  }
}
