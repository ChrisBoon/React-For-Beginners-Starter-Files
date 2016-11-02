import React from 'react';
import { Link } from 'react-router';

import ChooseUser from './ChooseUser';


class InviteUserToChat extends React.Component{

  constructor() {
    super();
    this.inviteUsers = this.inviteUsers.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.state = {
      addedUsers: []
    }
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

  inviteUsers(event){
    event.preventDefault();
    const message = {
      author: this.props.currentUser.userId,
      dateCreated: Date.now(),
      messageType: 'addViewer',
      messageContent: this.state.addedUsers
    };
    this.props.addViewersToMessage(message);
    this.addViewerForm.reset();    
  }

  render(){
    const users = this.props.users;
    const isAddUsersButtonDisabled = this.state.addedUsers.length>0 ? false : true;

    return(
      <div className="c-invite modal">
        <form
        ref={(input) => this.addViewerForm = input} 
        onSubmit={ (e) => this.inviteUsers(e) }>

          <ChooseUser
            currentUser={this.props.currentUser}
            viewers={this.props.chatData.viewers}
            users={users} 
            updateStatus={this.updateStatus}
            addedUsers={this.state.addedUsers}/>

          <Link to={`/chat/${this.props.parentPath}`}>
            <button>Cancel</button>
          </Link>

          <button type="submit" disabled={isAddUsersButtonDisabled}>Add users</button>
        </form>

      </div>
    )
  }
}

InviteUserToChat.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  users: React.PropTypes.object.isRequired,
  chatData: React.PropTypes.object.isRequired,
}

export default InviteUserToChat;