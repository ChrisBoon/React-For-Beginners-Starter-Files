import React from 'react';
import {Link} from 'react-router';

import Header from './Header';

class InviteUserToChat extends React.Component{

  constructor() {
    super();
    this.renderUser = this.renderUser.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
  }

  inviteUser(userId){
    // do something
    // go back to regular chat view
  }

  renderUser(key) {
    const users = this.props.users;
    return (
      <p key={key}>{users[key].name}</p>
    )
  }

  render(){
    const users = this.props.users;
    return(
      <div className="c-invite modal">

          <ul>{
            Object
              .keys(users)
              .map(this.renderUser)}
          </ul>

      </div>
    )
  }
}

InviteUserToChat.propTypes = {
  users: React.PropTypes.object.isRequired,
  chatData: React.PropTypes.object.isRequired,
}

InviteUserToChat.contextTypes = {
  router: React.PropTypes.object
}

export default InviteUserToChat;