import React from 'react';
import { Link } from 'react-router';

import Header from './Header';
import ChooseUser from './ChooseUser';

class NewChat extends React.Component{

  constructor() {
    super();
    this.renderUserList = this.renderUserList.bind(this);
    this.toggleUserList = this.toggleUserList.bind(this);
    this.state = {
      isUserListOpen: false
    }
  }

  toggleUserList(e) {
    e.preventDefault();
    this.setState({
      isUserListOpen: !this.state.isUserListOpen
    })
  }

  renderUserList() {
    return(
      <div className="c-newchat-addUsers modal">
        <form
        ref={(input) => this.addViewerForm = input} 
        onSubmit={ (e) => this.inviteUsers(e) }>
        {console.log(this.props.currentUser)}
          <ChooseUser
            currentUser={this.props.currentUser}
            viewers={[]}
            users={this.props.users} 
            updateStatus={this.updateStatus}
            addedUsers={this.state.addedUsers}/>

            <button onClick={(e) => this.toggleUserList(e)}>Cancel</button>

          <button type="submit">Add users</button>
        </form>

      </div>
    )
  }

	render(){
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
          <form>
            <button onClick={(e) => this.toggleUserList(e)}>To:</button>
            <div className="newChatSelectedUsers">

            </div>
            <label>
              <span>Title: </span><input type="text"/>
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