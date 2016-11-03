import React from 'react';
import { Link } from 'react-router';

import ChatLatest from './ChatLatest';

class ChatList extends React.Component{

  constructor() {
    super();
    this.renderMessages = this.renderMessages.bind(this);
    this.filterAccess = this.filterAccess.bind(this);
    this.setViewAll = this.setViewAll.bind(this);
    this.state = {
      viewAll: {
        set: false
      }
    }
  }

  renderMessages(key) {
    //all chats
    const chats = this.props.chats;
    const myHistory = this.props.users[this.props.currentUser.userId].messageHistory || {}
    const myCount = myHistory[key] || 0;

    const unreadCount = chats[key].count - myCount;
    //limit to chats the user is involved in
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
  filterAccess(key) {
    const currentUser = this.props.currentUser,
      chats = this.props.chats;

    const isTeacher = currentUser.role === 'teacher';

    if (isTeacher && this.state.viewAll.set) {
      return true;
    }
    else if (chats[key].viewers.includes(currentUser.userId) ) {
      return true;
    }
  }
  setViewAll(event) {
    let viewAll = {...this.state.viewAll};
    if (event.target.checked) {
      viewAll.set = true
    } else {
      viewAll.set = false
    }
    this.setState({viewAll})

  }
	render(){
    const chats = this.props.chats;
    let teacherViewToggle;

    if (this.props.currentUser.role === 'teacher') {
      teacherViewToggle = <div className='teacher-toggle'>
                            <label>Admin mode
                              <input 
                                type="checkbox" 
                                name={teacherViewToggle}
                                onChange={this.setViewAll}
                                ref={(input)=>{this.checkme = input}}
                                />
                                </label>
                            </div>
    }
    if (this.props.users[this.props.currentUser.userId].messageHistory || this.state.viewAll) {
      return(
        <div className="op2-chatList">
          <div className="chatList-controls">
            <Link to={`/new-chat`}>
              <button>New Chat</button>
            </Link>
              {teacherViewToggle}
          </div>
          <ul>
            {
              Object
                .keys(chats)
                .filter(this.filterAccess)
                .sort(
                  (a,b) => { 
                    const dateA = chats[a].messages[chats[a].messages.length-1].dateCreated,
                      dateB = chats[b].messages[chats[b].messages.length-1].dateCreated;
                    if (dateA < dateB) {
                      return 1;
                    }
                    if (dateA > dateB) {
                      return -1;
                    }
                    return 0;
                  }
                )
                .map(this.renderMessages)
            }       
          </ul>
        </div>
      )
    } else {
      return(
        <div className="op2-chatList">
          <Link to={`/new-chat`}>
            <button>New Chat</button>
          </Link>
            {teacherViewToggle}

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