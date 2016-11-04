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
    this.handleResize =this.handleResize.bind(this);

		//getInitialState
		this.state = {
			users: {},
      windowWidth: window.innerWidth
		}
	}

	componentWillMount() {
		this.setState({
			users: userData
		})
	}

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize(e) {
    this.setState({
    windowWidth: window.innerWidth
    });
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
    const smallWidth= this.state.windowWidth <760? true : false;
    const user = this.props.allUsers[this.props.user.userId]
    const chatList = <ChatList 
                      users={this.props.allUsers}
                      chats={this.props.chats}
                      currentUser={this.props.user}
                      deleteChat={this.props.deleteChat}
                    />;
    const noChats = <div>No chats selected</div>;
    let chatListBigContent,
        chatViewBigContent;
    if (!smallWidth) {
      chatListBigContent = noChats;
      chatViewBigContent = chatList;
    }

      return (
        <div className="view-container">
          <Header title="Chat" avatar={user.image} username={user.name}/>

          <div className="content-container">

            <Match pattern={`/chat/`} exactly render={
              ()=>(
                <div>
                  {chatList}
                  {chatListBigContent}
                </div>
              )
            } />

            <Match pattern={`/chat/:chatId`} render={
              (params) => (
                <div>
                  {chatViewBigContent}
                  <ChatView 
                    chats={this.props.chats} 
                    users={this.props.allUsers} 
                    currentUser={this.props.user} 
                    updateCount={this.updateCount} 
                    addMessage={this.addMessage}
                    addViewersToMessage={this.addViewersToMessage}
                    leaveChat={this.leaveChat}
                    {...params}
                    />
                  </div>
                )
              } 
            />
          </div>
      
        </div>
      )
    }
	}

App.propTypes = {
  user: React.PropTypes.object.isRequired,
}

export default App;