import React, { Component } from 'react';
// import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/header/header'
import Chat from './components/chat/chat'
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
          <Header />
          <Chat />
        </div>
    )
  }
}

export default App;
