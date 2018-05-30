import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import socket from '../../socket/api'
import './header.css'

export default class userHeader extends Component {

  constructor(props){
    super(props)
    this.state={}
  }

  render() {
    return (
      <div>
        <header className="header">
          <ul className='site_nav'>
            <Link to="/"><li id="logout" onClick={window.localStorage.clear()}>Logout</li></Link>
            <Link to="/profile"><li>Profile</li></Link>
            <Link to="/chat"><li>Chatroom</li></Link>
          </ul>
        </header>
      </div>
    )
  }
}
