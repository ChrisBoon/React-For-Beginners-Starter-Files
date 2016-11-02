import React from 'react';
import { Link } from 'react-router';

import Header from './Header';
import ChooseUser from './ChooseUser';

class NewChat extends React.Component{

  constructor() {
    super();
    this.renderUserList = this.renderUserList.bind(this);
    this.toggleUserList = this.toggleUserList.bind(this);
    this.updateStatus = this.updateStatus.bind(this);

    this.state = {
      isUserListOpen: false,
      addedUsers: []
    }
  }

  toggleUserList(e) {
    e.preventDefault();
    this.setState({
      isUserListOpen: !this.state.isUserListOpen
    })
  }

  updateStatus(status,userId) {
    const addedUsers = this.state.addedUsers.slice();
    if (status ==='add') {
      addedUsers.push(userId);
    } else {
      const i = addedUsers.indexOf(userId);
      if(i !== -1) {
        addedUsers.splice(i, 1);
      }
    }
    this.setState({
      addedUsers
    });

  }

  renderUserList() {
    return(
      <div className="c-newchat-addUsers modal">
        <form
        ref={(input) => this.addViewerForm = input} 
        onSubmit={ (e) => this.inviteUsers(e) }>

          <ChooseUser
            currentUser={this.props.currentUser}
            viewers={[]}
            users={this.props.users} 
            updateStatus={this.updateStatus}
            addedUsers={this.state.addedUsers}/>

          <button onClick={(e) => this.toggleUserList(e)}>Close</button>
        </form>

      </div>
    )
  }

  addChat(event) {
    event.preventDefault();
    console.log(this.state.addedUsers.length)
    const usersAdded = this.state.addedUsers.length > 0 ? true : false
    if (! usersAdded) {
      alert(`oops, looks like you forgot to choose who to send this Chat to!`)
    } else {

      const time = Date.now();

      const message = {
        author: this.props.currentUser.userId,
        dateCreated: time,
        messageType: 'text',
        messageContent: this.message.value
      };

      const chatFragment = {
        title: this.title.value,
        viewers: [...this.state.addedUsers, message.author],
        message: message
      };
      this.props.addChat(chatFragment);

    }
  }  

	render(){
    const addedUsers = this.state.addedUsers;

    let showUserList;
    if (this.state.isUserListOpen) {
      showUserList = this.renderUserList()
    }

		return(
      <div className="c-newchat view-container">
        <Header title="New Chat" avatar={this.props.currentUser.image} username={this.props.currentUser.name}/>
        <div className="content-container">
    			<div className="op2-newChat">
          {showUserList}
          <form
            ref={(input) => this.addChatForm = input} 
            onSubmit={ (e) => this.addChat(e) }>

            <button onClick={(e) => this.toggleUserList(e)}>To:</button>

            <div className="newChatSelectedUsers">
              {
                addedUsers.map(
                  item => {
                    return <div key={item}>{item}</div>
                  }
                )
              }
            </div>

            <label>
              <span>Title: </span>
              <input ref={(input) => this.title = input} type="text" placeholder="Chat title..." required />
            </label>

            <textarea ref={(input) => this.message = input} placeholder="Write a message..." required ></textarea>
            <Link to={`/chat`}>
              <button>Cancel</button>
            </Link>
            <button type="submit">Send 💬</button>
          </form>
    			</div>
        </div>
      </div>
		)
	}
}

export default NewChat;