import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export default class Header extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <ul className='site_nav'>
            <Link to="/"><li>Login</li></Link>
            <Link to="/register"><li>Register</li></Link>
            <Link to="/profile"><li>Profile</li></Link>
          </ul>
        </header>
      </div>
    )
  }
}
