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
            <Link to="/"><li id="logout" onclick={window.localStorage.clear()}>Logout</li></Link>
            <Link to="/register"><li>Register</li></Link>
            <Link to="/profile"><li>Profile</li></Link>
          </ul>
        </header>
      </div>
    )
  }
}
