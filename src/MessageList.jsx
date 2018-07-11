import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render(){

    const messageList = this.props.messages.map((message) => {
      console.log(message.id);
     return <Message key={message.id} message={message} />
 })
    return (
      <main className="messages">
       {messageList}
        <div className="message system">

        </div>
      </main>
    )
  }
}

export default MessageList;
