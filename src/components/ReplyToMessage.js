import React from 'react';
import { Link } from 'react-router';

class ReplyToMessage extends React.Component {
  createReply(event) {
    event.preventDefault();
    
    const message = {
      author: this.props.author,
      dateCreated: Date.now(),
      messageType: 'text',
      messageContent: this.message.value
    }
    this.props.postReply(message);
    this.replyForm.reset();
  }

  render() {
    console.log(this.props.parentPath)
    return (
      <form ref={(input) => this.replyForm = input} className="reply-edit" onSubmit={(e) => this.createReply(e)}>
        <textarea ref={(input) => this.message = input} placeholder="Write a message..." required ></textarea>
        <Link to={`/chat/${this.props.parentPath}`}>
          <button>Cancel</button>
        </Link>
        <button type="submit">Reply 💬</button>
      </form>
    )
  }
}

export default ReplyToMessage;