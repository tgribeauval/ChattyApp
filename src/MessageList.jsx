import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render(){

    const messageList = this.props.messages.map((message) => {
      console.log(message);
      if (message.type == 'incomingNotification') {
       return (
        <div className="message system">
         {message.content}
        </div>
       )
      }
      if (message.type == 'incomingMessage') {
        return (
          <Message key={message.id} message={message} />
        )
      }

   }
 )
    return (
      <main className="messages">
       {messageList}
      </main>
    )
  }
}

export default MessageList;
