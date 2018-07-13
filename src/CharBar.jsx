// line 11 sets a defaultValue and an onKeyPress event which sends us to line 71 in our App.jsx file
// line 12 represents the message input. It also has an onKeyPress event which sends us to line 56 in our App.jsx file.


import React, {Component} from 'react';

class CharBar extends Component {
  render(){
    return (
        <footer className ="chatbar">
          <input id="username"className="chatbar-username" defaultValue={this.props.currentUser} onKeyPress={this.props.handleNewUsername} />
          <input id="messageText" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.onMessageSubmit} />
        </footer>
      )
    }
}



export default CharBar;
