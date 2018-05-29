import React, { Component } from 'react';
import Header from '../header/userHeader';
import { Link } from 'react-router-dom'
import './profile.css';

class App extends Component {
  render() {
    return (
      <div>
      <Header />
        <div className="profile">
          <h1>Welcome <strong>User</strong></h1>
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

export default App;
