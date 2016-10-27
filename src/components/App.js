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
            />
            <Match pattern={`/chat/:chatId`} component={(params) => <ChatView 
              chats={this.props.chats} 
              users={this.props.allUsers} 
              currentUser={this.props.user} 
              updateCount={this.updateCount} 
              addMessage={this.addMessage}
              addViewersToMessage={this.addViewersToMessage}
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