
//line 12 is the Chatty logo which will redirect the user to the home page went clicked
//line 14 is used to display how many users are connected.

import React, {Component} from 'react';


class NavBar extends Component {
  render(){
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="usersOnline">
         {this.props.usersOnline} users online
        </div>
      </nav>
    )
  }
}

export default NavBar;
