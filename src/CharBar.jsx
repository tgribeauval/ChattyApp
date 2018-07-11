import React, {Component} from 'react';

class CharBar extends Component {
  render(){
    console.log(this.props)
    return (
        <footer className ="chatbar">
          <input className="chatbar-username" defaultValue={this.props.currentUser} />
          <input id="messageText" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.onMessageSubmit} />
        </footer>
      )
    }
}



export default CharBar;
