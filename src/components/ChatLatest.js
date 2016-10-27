import React from 'react';
import Message from './Message';

import { Link } from 'react-router';

class ChatLatest extends React.Component{

  constructor() {
    super();
    this.getLatestData = this.getLatestData.bind(this);
  }

  getLatestData() {
    //get all messages
    const messages = this.props.messages;
    //get the last mesage
    const last = messages[messages.length - 1]
    //get its author
    const user = last.author;
    //return a single object with all data for last message and its user
    return {
      message:last,
      user: this.props.users[user]
    };
  }
	render(){
    const message = this.getLatestData();
		return(
      <Link to={`/chat/${this.props.index}`} activeClassName="op2-chatLatest-a op2-chatLatest-a-active">
			<div className="op2-chatLatest">
				<header className="op2-chatLatest-header">
					<h2 className="op2-chatLatest-heading">{this.props.title}</h2>
          {this.props.count > 0? <span className="unreadCounter">{this.props.count}</span> : <span></span> }
					{/* If teacher: add delete control */}
				</header>
        <div className="op2-chatLatest-label">Latest message:</div>
				<Message
            avatar={message.user.image}
            username={message.user.name}
            date={message.message.dateCreated}
            type={message.message.messageType}
            content={message.message.messageContent}
            name={message.user.name}
            users={this.props.users}
        />
			</div>
      </Link>
		)
	}
}
ChatLatest.propTypes = {
  users: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  dateCreated: React.PropTypes.number.isRequired,
  count: React.PropTypes.number.isRequired,
  messages: React.PropTypes.array.isRequired,
}

export default ChatLatest;