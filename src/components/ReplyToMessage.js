import React from 'react';

class ReplyToMessage extends React.Component {
  createReply(event) {
    event.preventDefault();
    console.log(this)
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
    return (
      <form ref={(input) => this.replyForm = input} className="reply-edit" onSubmit={(e) => this.createReply(e)}>
        <textarea ref={(input) => this.message = input} placeholder="Write a message..." required ></textarea>
        <button type="submit">Reply 💬</button>
      </form>
    )
  }
}

export default ReplyToMessage;