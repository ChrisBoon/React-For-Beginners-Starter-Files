import React from 'react';

import Message from './Message';
import ReplyToMessage from './ReplyToMessage';

class ChatView extends React.Component{
  constructor() {
    super();
    this.renderMessage = this.renderMessage.bind(this);
    this.createMessage = this.createMessage.bind(this);

    this.state = {
      currentChatId: location.pathname.replace('/chat/','')
    };
  }

  componentWillMount() {
    this.props.updateCount(this.props.currentUser.userId,this.state.currentChatId);
  }


  renderMessage(item) {
    const user = (this.props.users[item.author]);
    return <Message
            avatar={user.image}
            username={user.name}
            date={item.dateCreated}
            type={item.messageType}
            content={item.messageContent}
          />
  }

  createMessage(obj) {
    this.props.addMessage(this.state.currentChatId, obj);
  }


  render(){
    const chats = this.props.chats;
    const chat = chats[this.state.currentChatId];    
    return(
        <div className="op2-chatView">    
          <h3 className="op2-chatView-heading">{chat.title}</h3>
            <ul className="op2-chatView-messages">
              {
                chat.messages.map((key,i) => (
                  <li className="op2-chatView-message" key={i}>
                    {this.renderMessage(key)}
                  </li>
                ))
              }
            </ul>
            <div className="op2-chatView-controls">
              <ReplyToMessage
                author={this.props.currentUser.userId}
                postReply={this.createMessage}
              />
            </div>
          </div>      
    )

  }
}
ChatView.propTypes = {
  chats: React.PropTypes.object.isRequired,
  users: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  addMessage: React.PropTypes.func.isRequired,
}

export default ChatView;