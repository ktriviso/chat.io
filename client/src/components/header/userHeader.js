import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export default class userHeader extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <header className="header">
          <ul className='site_nav'>
            <Link to="/"><li id="logout" onClick={window.localStorage.clear()}>Logout</li></Link>
            <Link to="/register" onClick={window.localStorage.clear()}><li>Register</li></Link>
            <Link to="/profile"><li>Profile</li></Link>
          </ul>
        </header>
      </div>
    )
  }
}
