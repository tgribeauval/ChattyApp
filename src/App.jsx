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
          currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: []
     }
   }

         componentDidMount() {

           const ws = this.socket;
           ws.onopen = function (event) {
             console.log('Client Connected to Server')
           };
           ws.onmessage = (event) => {
             const incomingMessage= JSON.parse(event.data);
             const newListMessages = this.state.messages.concat(incomingMessage)
             this.setState({messages: newListMessages})
           }
           console.log("componentDidMount <App />");
         }
  onMessageSubmit = (event) => {
    console.log(this.state)
    if (event.key == 'Enter'){
      const messageText = event.target.value
      const newMessage = {
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
      const userInput = event.target.value
      this.setState({currentUser: {name: userInput}})
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <MessageList messages={this.state.messages}/>
        <CharBar currentUser={this.state.currentUser.name} handleNewUsername={this.handleNewUsername} onMessageSubmit={this.onMessageSubmit}/>
      </div>
    );
  }
}
export default App;
