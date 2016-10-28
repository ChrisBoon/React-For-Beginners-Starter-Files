import React from 'react';
import { Match, Link } from 'react-router';
import Message from './Message';
import ReplyToMessage from './ReplyToMessage';
import InviteUserToChat from './InviteUserToChat';


class ChatView extends React.Component{
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.addViewersToMessage = this.addViewersToMessage.bind(this);
    this.doesChatExist = this.doesChatExist.bind(this);
  }

  componentWillMount() {
    if ( this.doesChatExist() ) {
      this.props.updateCount(this.props.currentUser.userId,this.props.params.chatId);
    }
  }

  doesChatExist() {
    const chats = this.props.chats;
    const chatsArray = Object.keys(chats).map(key=>{return key});
    if (chatsArray.includes(this.props.params.chatId)) {
      return true;
    }
  }

  renderMessage(item) {
    const user = (this.props.users[item.author]);
    return <Message
            avatar={user.image}
            username={user.name}
            date={item.dateCreated}
            type={item.messageType}
            content={item.messageContent}
            name={user.name}
            users={this.props.users}            
          />
  }

  createMessage(obj) {
    this.props.addMessage(this.props.params.chatId, obj);
    this.context.router.transitionTo(`/chat/${this.props.params.chatId}`)
  }
  addViewersToMessage(obj) {
    this.props.addViewersToMessage(this.props.params.chatId, obj);
    this.context.router.transitionTo(`/chat/${this.props.params.chatId}`)
  }


  render(){
    const chats = this.props.chats;
    const chat = chats[this.props.params.chatId];

    if ( this.doesChatExist() ) {
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
                <Match pattern={`/chat/:chatId`} exactly render={() => (
                  <div className="op2-chatView-controls">
                    <Link to={`/chat/${this.props.params.chatId}/reply`}>
                      <button>add message</button>
                    </Link>
                    <Link to={`/chat/${this.props.params.chatId}/invite`}>
                      <button>invite users</button>
                    </Link>
                    <button>leave chat</button>
                </div>

                )}/>
                
                <Match pattern={`/chat/:chatId/reply`} component={(params) => <ReplyToMessage
                  author={this.props.currentUser.userId}
                  postReply={this.createMessage}
                  parentPath={this.props.params.chatId}
                />}/>

                <Match pattern={`/chat/:chatId/invite`} component={(params) => <InviteUserToChat
                  chatData={chat}
                  users={this.props.users}
                  currentUser={this.props.currentUser}
                  addViewersToMessage={this.addViewersToMessage}
                  parentPath={this.props.params.chatId}
                />}/>              

            </div>      
      )
    } else {
      return(
        <div className="op2-chatView"> Sorry, this chat doesn't exist. Either it was deleted or you entered a bad URL. This message should be made more user-friendly</div>
      )
    }


  }
}

ChatView.propTypes = {
  chats: React.PropTypes.object.isRequired,
  users: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  addMessage: React.PropTypes.func.isRequired,
}

ChatView.contextTypes = {
  router: React.PropTypes.object
}

export default ChatView;