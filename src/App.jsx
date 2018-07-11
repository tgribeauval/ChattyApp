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
    this.state = {
                  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
                  messages: [
                 {
                  id: 1,
                  username: "Bob",
                  content: "Has anyone seen my marbles?",
                 },
                 {
                   id: 2,
                   username: "Anonymous",
                   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                 }
               ]
             }
           }

         componentDidMount() {
           console.log("componentDidMount <App />");
           setTimeout(() => {
             console.log("Simulating incoming message");
             // Add a new message to the list of messages in the data store
             const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
             const messages = this.state.messages.concat(newMessage)
             // Update the state of the app component.
             // Calling setState will trigger a call to render() in App and all child components.
             this.setState({messages: messages})
           }, 3000);
         }
  onMessageSubmit = (event) => {
    if (event.key == 'Enter'){
      const messageText = document.getElementById("messageText").value;
      const newMessage = {
        id: generateRandomString(),
        username: 'Anonymous',
        content: messageText
      }
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
      document.getElementById("messageText").value = "";
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <MessageList messages={this.state.messages}/>
        <CharBar currentUser={this.state.currentUser.name} onMessageSubmit={this.onMessageSubmit}/>
      </div>
    );
  }
}
export default App;
