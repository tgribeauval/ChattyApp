import React, {Component} from 'react';
import CharBar from './CharBar.jsx'
import MessageList from './MessageList.jsx'
import NavBar from './NavBar.jsx'



function generateRandomString() {
return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
}


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:3001");
    this.state = {
          currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [],
          connectedUsersLength: 0
     }
   }

   componentDidMount() {
     const that = this
     const ws = this.socket;
     ws.onopen = function (event) {

       console.log('Client Connected to Server')
     };
     ws.onmessage = (message) => {
       const incomingMessage= JSON.parse(message.data);
       if(incomingMessage.type === 'usersOnline'){
         that.setState({connectedUsersLength: incomingMessage.userslength})
       }else{
         const newListMessages = this.state.messages.concat(incomingMessage)
         that.setState({messages: newListMessages})
       }


     }
     console.log("componentDidMount <App />");
   }

  render() {
    return (
      <div>
        <NavBar usersOnline={this.state.connectedUsersLength}/>
        <MessageList messages={this.state.messages}/>
        <CharBar currentUser={this.state.currentUser.name} handleNewUsername={this.handleNewUsername} onMessageSubmit={this.onMessageSubmit}/>
      </div>
    );
  }

  onMessageSubmit = (event) => {
    console.log(this.state)
    if (event.key == 'Enter'){
      const messageText = event.target.value
      const newMessage = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: messageText
      }
      const messages = this.state.messages.concat(newMessage)

      this.socket.send(JSON.stringify(newMessage))
      document.getElementById("messageText").value = "";
    }
  }

  handleNewUsername = event => {
    if (event.key == 'Enter'){
      const oldUsername = this.state.currentUser.name
      const newUsername = event.target.value
      this.setState({currentUser: {name: newUsername}})
      const notification = {
        type: "postNotification",
        content: `${oldUsername} has changed his username to ${newUsername}`
      }
      this.socket.send(JSON.stringify(notification));
    }
  }
}
export default App;
