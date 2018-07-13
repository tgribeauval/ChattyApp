
// line 12-25 is looping over the messages and checking the types.
// line 27-31 returns either line 16 or 22 depending on the condition.

import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render(){

    const messageList = this.props.messages.map((message) => {
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
   })

    return (
      <main className="messages">
       {messageList}
      </main>
    )
  }
}

export default MessageList;
