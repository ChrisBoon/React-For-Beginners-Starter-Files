import React from 'react';
import ChooseUserLi from './ChooseUserLi';

class ChooseUser extends React.Component{
  constructor() {
    super();
    this.stripSelf = this.stripSelf.bind(this);
    this.inClass = this.inClass.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.parseUsers = this.parseUsers.bind(this);
  }

  stripSelf(obj){
    if (obj === this.props.currentUser.userId) {
      return false
    } else {
      return true
    }
  }

  inClass(obj){
    const users = this.props.users;
    if (users[obj].inClass) {
      return true
    } else {
      return false
    }

  }

  updateStatus(status,userId) {
    this.props.updateStatus(status,userId);
  }

  renderUsers(key) {
    const users = this.props.users;
    const renderedUser = users[key];
    const alreadyWatching = this.props.viewers.includes(renderedUser.userId);
    const alreadyChecked = this.props.addedUsers.includes(renderedUser.userId);

    return <ChooseUserLi
            key={key}
            renderedUser={renderedUser}
            alreadyWatching={alreadyWatching}
            alreadyChecked={alreadyChecked}
            updateStatus={this.updateStatus}
            />
  }  

  parseUsers() {
    const users = this.props.users;

    return Object
      .keys(users)
      .filter(this.stripSelf)
      .filter(this.inClass)
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
  }

  render(){
    return <ul>{this.parseUsers().map(this.renderUsers)}</ul>
  }
}

export default ChooseUser;