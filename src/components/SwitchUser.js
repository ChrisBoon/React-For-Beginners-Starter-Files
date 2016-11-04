import React from 'react';
import {Link} from 'react-router';

import Header from './Header';

class SwitchUser extends React.Component{

  constructor() {
    super();
    this.renderUser = this.renderUser.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(userId){
    this.props.changeUser(userId);
    this.context.router.transitionTo(`/chat`)
  }

  renderUser(key) {
    const allUsers = this.props.allUsers;
    const userId = this.props.user.userId;
    const currentUser = userId === key;
    if (allUsers[key].inClass) {
      return(
        <li key={key} className={`c-switch-user c-switch-user-${allUsers[key].role} c-switch-user-${currentUser? 'true' : 'false'} `} onClick={()=> this.changeUser(key)}>
          <div className="avatar-container">
            <img src={allUsers[key].image} alt={allUsers[key].name} className="avatar-img"/>
          </div>
          <div className="c-switch-user-text">
            <h2 className="c-switch-user-name">{allUsers[key].name}</h2>
            <p className={`c-switch-user-role c-switch-user-role-${allUsers[key].role}`}>{allUsers[key].role}</p>
          </div>
        </li>
      )
    } else{
      return(
        <li key={key} className={`c-switch-user c-switch-user-inactive c-switch-user-${allUsers[key].role}`}>
          <div className="avatar-container">
            <img src={allUsers[key].image} alt={allUsers[key].name} className="avatar-img"/>
          </div>
          <div className="c-switch-user-text">
            <h2 className="c-switch-user-name">{allUsers[key].name}</h2>
            <p className={`c-switch-user-role c-switch-user-role-${allUsers[key].role}`}>{allUsers[key].role} <span className="c-switch-user-notInClass">No longer in class</span></p>
          </div>
          
        </li>
      )
    }
  }

  render(){
    const allUsers = this.props.allUsers;
    return(
      <div className="c-switch view-container">
      <Header title="Switch User" avatar={this.props.user.image} username={this.props.user.name}/>
        <div className="content-container">

          <ul>{
            Object
              .keys(allUsers)
              .map(this.renderUser)}
          </ul>
          <Link to={`/chat/`}>
            <p>Back to chat</p>
          </Link>
        </div>
      </div>
    )
  }
}

SwitchUser.propTypes = {
  user: React.PropTypes.object.isRequired,
  allUsers: React.PropTypes.object.isRequired,
  changeUser: React.PropTypes.func.isRequired
}

SwitchUser.contextTypes = {
  router: React.PropTypes.object
}

export default SwitchUser;