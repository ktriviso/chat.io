import React, { Component } from 'react';

export default class NewRoom extends Component {

  componentDidMount(){
    document.querySelector('.icon').onclick = function(){console.log('im clicked')};
  }


  render() {

    return (
      <div className="icon">+</div>
    )
  }
}
