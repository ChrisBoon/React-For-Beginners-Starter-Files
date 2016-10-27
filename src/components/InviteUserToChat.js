import React from 'react';


class InviteUserToChat extends React.Component{

  constructor() {
    super();
    this.renderUser = this.renderUser.bind(this);
    this.inviteUsers = this.inviteUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      addedUsers: []
    }
  }

  handleChange(event) {
    const addedUsers = this.state.addedUsers.slice();
    if (event.target.checked) {
      addedUsers.push(event.target.name);
    } else {
      const i = addedUsers.indexOf(event.target.name);
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

  renderUser(key) {
    const users = this.props.users;
    const renderedUser = users[key]
    const chatData = this.props.chatData;

    const alreadyWatching = chatData.viewers.includes(renderedUser.userId);
    let includeToggle;
    if (!alreadyWatching) {
      includeToggle = <input 
          type="checkbox" 
          name={key}
          onChange={this.handleChange}
          ref={(input)=>{this[key] = input}}
          />
    }
    
    return (
      <li 
      key={key}
      className={`c-invite-included-${alreadyWatching? 'true' : 'false'}`}
      >
        <label>{renderedUser.name}
        {includeToggle}
        </label>
        
        <span className={`toggle ${alreadyWatching? 'toggle-active toggle-disabled' : ''}`}></span>
      </li>
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
        <form
        ref={(input) => this.addViewerForm = input} 
        onSubmit={ (e) => this.inviteUsers(e) }>
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
          <button type="submit">Add users</button>
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