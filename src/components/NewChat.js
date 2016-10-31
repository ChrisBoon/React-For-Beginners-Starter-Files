import React from 'react';
import { Link } from 'react-router';

import Header from './Header';

class NewChat extends React.Component{
	render(){
		return(
      <div className="c-newchat view-container">
        <Header title="New Chat" avatar={this.props.user.image} username={this.props.user.name}/>
        <div className="content-container">
    			<div className="op2-newChat">
          <form>
            <button>To:</button>
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