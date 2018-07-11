import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {

  render(){
    console.log(this.props.messages[0].id);
    const messageList = this.props.messages.map((message) => {
     return <Message key= {message.id} message={message} />
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
