import React from 'react';
import TimeAgo from 'react-timeago';


class Message extends React.Component{
	render(){

    let content;
    let message;
    if (this.props.type ==='text'){
      message = <p className="op2-chatMessage-text">{this.props.content}</p>
    } 
    else if (this.props.type ==='addViewer') {
      const userNames = this.props.content.map(
        (value,i, arr) => {
          let divider;
          if (i<arr.length-2) {
            divider = <span>, </span>
          }
          else if (i===arr.length-2) {
            divider = <span> and </span>
          }
          return (
            <span key={i}>
              <span className="user-chip">
                <span className="avatar-container">
                  <img src={this.props.users[value].image} className="avatar-img"/>
                </span>
                {this.props.users[value].name}
              </span>
              {divider}
            </span>
          )
        }
      );

      const newUsers = this.props.content.slice(0, -1).join(',')+' and '+this.props.content.slice(-1);

      message = <p className="op2-chatMessage-text">{this.props.name} invited {userNames} to the chat</p>
    }
    else if (this.props.type ==='leave') {


      message = <p className="op2-chatMessage-text">
              <span className="user-chip">
                <span className="avatar-container">
                  <img src={this.props.avatar} className="avatar-img"/>
                </span>
                {this.props.name}
              </span> has left this Chat.</p>


    }
    if(this.props.type ==='text'|| this.props.type ==='addViewer'|| this.props.type ==='leave'){
      content = <div className="op2-chatMessage">
                  <div className="avatar-container">
                    <img src={this.props.avatar} alt={this.props.username} className="avatar-img"/>
                  </div>
                  <div className="op2-chatMessage-content">
                    <p className="op2-chatMessage-meta">
                      <span className="op2-chatMessage-username">{this.props.username}</span>
                      <TimeAgo className="op2-chatMessage-time" date={this.props.date}/>
                    </p>
                    {message}
                  </div>
                </div>
    }
    else{
      content = <div>Need to create template for {this.props.type} response</div>
    }
		return content
	}
}

Message.propTypes = {
  avatar: React.PropTypes.string,
  username: React.PropTypes.string.isRequired,
  date: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
}

export default Message;