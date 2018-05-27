import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './header.css'

export default class Header extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <ul className='site_nav'>
            <li>Login</li>
            <li>Register</li>
            <li>Profile</li>
          </ul>
        </header>
      </div>
    )
  }
}
