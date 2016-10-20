import React from 'react';

import Message from './Message';
import ReplyToMessage from './ReplyToMessage';

class ChatView extends React.Component{
  constructor() {
    super();
    this.renderMessage = this.renderMessage.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.renderView = this.renderView.bind(this);

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
  renderView(key){

    const chats = this.props.chats;
    const chat = this.props.chats[this.state.currentChatId];

    if (chat.chatId===key ) {
      return(
        <div className="op2-chatView" key={key}>    
          {console.log(`chat:${chat}`)}
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

  render(){
    return(
      <div>
        {
          //this is a really bad hack to make it not run this until index renders the second time
          Object
          .keys(this.props.chats)
          .map( (key)=>this.renderView(key) )
        }
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