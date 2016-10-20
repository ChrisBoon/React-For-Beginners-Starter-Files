import React from 'react';
import TimeAgo from 'react-timeago';


class Message extends React.Component{
	render(){

    let content;
    if(this.props.type ==='text'){
      content = <div className="op2-chatMessage">
                  <div className="avatar-container">
                    <img src={this.props.avatar} alt={this.props.username} className="avatar-img"/>
                  </div>
                  <div className="op2-chatMessage-content">
                    <p className="op2-chatMessage-meta">
                      <span className="op2-chatMessage-username">{this.props.username}</span>
                      <TimeAgo className="op2-chatMessage-time" date={this.props.date}/>
                    </p>
                    <p className="op2-chatMessage-text">{this.props.content}</p>
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
  content: React.PropTypes.string.isRequired,
}

export default Message;