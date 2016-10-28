import React from 'react';
import ChatLatest from './ChatLatest';

class ChatList extends React.Component{

  constructor() {
    super();
    this.renderMessages = this.renderMessages.bind(this);
  }

  renderMessages(key) {
    //all chats
    const chats = this.props.chats;
    const myCount = this.props.users[this.props.currentUser.userId].messageHistory[key];
    
    const unreadCount = chats[key].count - myCount;
    //limit to chats the user is involved in
    if (chats[key].viewers.includes(this.props.currentUser.userId) ) {
      return (
        <ChatLatest
          users={this.props.users}
          key={key}
          index={key}
          title={chats[key].title}
          dateCreated={chats[key].dateCreated}
          count={unreadCount}
          messages={chats[key].messages}
        />
      )  
    }
  }

	render(){
    const chats = this.props.chats;
    if (this.props.users[this.props.currentUser.userId].messageHistory) {
      return(
        <div className="op2-chatList">
          <div className="chatList-controls">
            <button>New Chat</button>
          </div>
          <ul>
            {
              Object.keys(chats).map(this.renderMessages)
            }       
          </ul>
        </div>
      )
    } else {
      return(
        <div className="op2-chatList">
          <div className="chatList-controls">
            <button>New Chat</button>
          </div>        
          <p className="no-chats-message">Looks like you aren't in any Chats right now.</p>
        </div>
      )
    }

	}
}

ChatList.propTypes = {
  users: React.PropTypes.object.isRequired,
  currentUser: React.PropTypes.object.isRequired,
	chats: React.PropTypes.object.isRequired,
}

export default ChatList;