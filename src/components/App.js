import React from 'react';

import { Match } from 'react-router';

import Header from './Header';
import ChatList from './ChatList';
import ChatView from './ChatView';
import userData from '../sample-fishes';

class App extends React.Component{
	constructor() {
		super();

    this.addMessage = this.addMessage.bind(this);
    this.addViewersToMessage = this.addViewersToMessage.bind(this);
    this.updateCount = this.updateCount.bind(this);
    this.leaveChat = this.leaveChat.bind(this);
    this.deleteChat = this.deleteChat.bind(this);

		//getInitialState
		this.state = {
			users: {}
		}
	}

	componentWillMount() {
		this.setState({
			users: userData
		})
	}

  updateCount(userId,chatId){
    this.props.updateCount(userId, chatId);
  }

  addMessage(chatId, chatData) {
    this.props.addMessage(chatId, chatData);
  }
  addViewersToMessage(chatId, chatData) {
    this.props.addViewersToMessage(chatId, chatData);
  }
  leaveChat(chatId, chatData){
    this.props.leaveChat(chatId, chatData);

  }
  deleteChat(chatId){
    this.props.deleteChat(chatId);
  }

	render(){
      let content;
      // wait for props to be ready before rendering
      if (this.props.allUsers[this.props.user.userId]) {

        const user = this.props.allUsers[this.props.user.userId]

        content = <div className="view-container">
          <Header title="Chat" avatar={user.image} username={user.name}/>
          <div className="content-container">
            <ChatList 
              users={this.props.allUsers}
              chats={this.props.chats}
              currentUser={this.props.user}
              deleteChat={this.props.deleteChat}
            />

            <Match pattern={`/chat/`} exactly render={
              ()=>(<div>No chats selected</div>)
            } />

            <Match pattern={`/chat/:chatId`} component={(params) => <ChatView 
              chats={this.props.chats} 
              users={this.props.allUsers} 
              currentUser={this.props.user} 
              updateCount={this.updateCount} 
              addMessage={this.addMessage}
              addViewersToMessage={this.addViewersToMessage}
              leaveChat={this.leaveChat}
              {...params}
              />} 

              />
          </div>
          
        </div>
      } else {
        content = <div></div>
      }
  		return content;
    }
	}

App.propTypes = {
  user: React.PropTypes.object.isRequired,
}

export default App;