import React, {Component} from 'react';
import CharBar from './CharBar.jsx'
import MessageList from './MessageList.jsx'
import NavBar from './NavBar.jsx'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
          currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [],
          connectedUsersLength: 0
     }
   }

   componentDidMount() {
     this.socket = new WebSocket("ws://localhost:3001"); // Creates WebSocket connection
     this.socket.onopen = function (event) { // when a new connection is open, run the follow code

       console.log('Client Connected to Server')
     };
     // line 25 - 31 runs when a person is receiving message
     this.socket.onmessage = (message) => { // An event listener to be called when a message is received from the server. The listener receives a MessageEvent named "message". Original the message is sent by some client to the server.
       const incomingMessage= JSON.parse(message.data); // message is an object. we want the value of the  key data. We need to parse it into an object becaue its easier to navigate through it and retrieve the information we need.
       if (incomingMessage.type === 'usersOnline'){ // within the data object, we have a key named type and a value of 'usersOnline', on this line we are creating a condition to check type.
         this.setState({connectedUsersLength: incomingMessage.userslength}) // on this line we are setting the state of connectUsers to the value of the key userslength in the object data. this sends us to line 14.
       } else { // if type is not equal to 'usersOnline', run this line of code.
          const newListMessages = this.state.messages.concat(incomingMessage) // creating a variable newListMessage and using the .concat method to concat our new message to our messages object
          this.setState({messages: newListMessages}) // setting the state of messages to the variable we created above.
        }


     }
     console.log("componentDidMount <App />");
   }

  render() { // rendering the UI
    // line 44 sends us to line 27, which sets the state of connectedUsersLength at line 14. We want to pass the state into our NavBar.jsx file
    // line 45 has the concept same as line 41. this sends us to line 30 which sets the state of messages on line 13.
    // line 46 sends to line 66 and 51.
    return (
      <div>
        <NavBar usersOnline={this.state.connectedUsersLength}/>
        <MessageList messages={this.state.messages}/>
        <CharBar handleNewUsername={this.handleNewUsername} onMessageSubmit={this.onMessageSubmit}/>
      </div>
    );
  }
// line 60 runs with a person is submitting a message
  onMessageSubmit = (event) => { // creating an event handler
    if (event.key == 'Enter'){ // initializing which key needs to be pressed
      const messageText = event.target.value // creating a variable that holds the value of what the user input is.
      const newMessage = { // creating a variable that is equal to an object.
        type: 'postMessage', // initializing a type so we can check it later on. this sends us to line 47 in our server.js file
        username: this.state.currentUser.name, // this line sends us to line 12 but passing through line 70 first. The username might of been updated.
        content: messageText // content is equal to line 53
      }
      const messages = this.state.messages.concat(newMessage) // concating the submitted message to the state which is broadcasted to all users.

      this.socket.send(JSON.stringify(newMessage)) // newMessage needs to be turned into a string in order to pass it to the server
      document.getElementById("messageText").value = ""; //resetting the value of the input box to nothing after a person sends it.
    }
  }

  handleNewUsername = event => { //creating an event handler
    if (event.key == 'Enter'){ // initializing which key needs to be pressed
      const oldUsername = this.state.currentUser.name // creating a variable that will hold the current value of line 12
      const newUsername = event.target.value // creating a variable that hold what the user has entered into the username input box
      this.setState({currentUser: {name: newUsername}}) // setting the state of line 12 to line 69
      const notification = { // creating a variable notification which is an object
        type: "postNotification", // setting a type
        content: `${oldUsername} has changed his username to ${newUsername}` // content
      }
      this.socket.send(JSON.stringify(notification)); // stringify it and send it to the server
    }
  }
}
export default App;
