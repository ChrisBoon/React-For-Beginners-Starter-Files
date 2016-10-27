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
    const renderedUser = users[key]
    const chatData = this.props.chatData;

    const alreadyWatching = chatData.viewers.includes(renderedUser.userId);
    
    if (true) {}
    return (
      <p 
      key={key}
      className={`c-invite-included-${alreadyWatching? 'true' : 'false'}`}
      >{renderedUser.name}</p>
    )
  }

  render(){
    const users = this.props.users;

    const stripSelf = (obj) =>{
      if (obj === this.props.currentUser.userId) {
        return false
      } else {
        return true
      }
    };

    return(
      <div className="c-invite modal">
          <ul>{
            Object
              .keys(users)
              .filter(stripSelf)
              .sort((a,b) => { 
                const nameA = users[a].name,
                      nameB = users[b].name;
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
              .map(this.renderUser)}
          </ul>

      </div>
    )
  }
}

InviteUserToChat.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  users: React.PropTypes.object.isRequired,
  chatData: React.PropTypes.object.isRequired,
}

InviteUserToChat.contextTypes = {
  router: React.PropTypes.object
}

export default InviteUserToChat;