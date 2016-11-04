// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';

import importUsers from './starter-user-data';
import importChats from './sample-chats';

import base from './base';

import Dashboard from './components/Dashboard';
import App from './components/App';
import NotFound from './components/NotFound';
import SwitchUser from './components/SwitchUser';
import NewChat from './components/NewChat';

class Root extends React.Component{
  constructor() {
    super();

    this.initApp = this.initApp.bind(this);
    this.updateCount = this.updateCount.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.addViewersToMessage = this.addViewersToMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.resetData = this.resetData.bind(this);
    this.leaveChat = this.leaveChat.bind(this);
    this.addChat = this.addChat.bind(this);
    this.deleteChat = this.deleteChat.bind(this);
    this.updateUserMessageHistory = this.updateUserMessageHistory.bind(this);

    this.state = {
      v1: {
        chats: {},
        users: {},
        deletedChats: {}
      },
      currentUser: {},
      loading: true
    }
  }

  initApp() {
    // called once rebase callback confirms app is in sync with firebase

    // check localStorage to see if we've already chosen a user
    // firebase has synced and we have checked localStorage so now we can display the App and set this.state.currentUser
    const signedInAs = localStorage.getItem(`v1-signedInAs`);
    this.setState({
      loading: false,
      currentUser: this.state.v1.users[signedInAs] || this.state.v1.users['u1sss1s']
    });
  }

  componentWillMount() {
    // sync with firebase for bidirectional changes and call initApp() once done
    this.ref = base.syncState(`/v1`,{
      context: this,
      state: 'v1',
      then: e=> {this.initApp()}
    })
  }

  addChat(chatData) {
    // function for creating a totally new Chat thread
    // bubbles up from NewChat: Root => NewChat.

    // get copy of current state
    const v1 = {...this.state.v1};
    //get date created
    const chatDate = chatData.message.dateCreated;

    // create new chat object
    const chat = {
      chatId: `chat${chatDate}`,
      title: chatData.title,
      dateCreated: chatDate,
      count: 1,
      viewers: chatData.viewers,
      messages: [chatData.message]
    };
    // add it to v1 copy:
    v1.chats[chat.chatId] = chat;

    // set state
    this.setState({ v1 });

    // add chat to users userX.messageHistory:
    for (const userId of chatData.viewers) {
      this.updateUserMessageHistory(userId,chat.chatId,0)
    }
  }

  addMessage(chatId, chatData) {
    // function for replying to an existing Chat thread
    // bubbles up from ReplyToMessage: Root => App => ChatView => ReplyToMessage.

    // get copy of current state
    const v1 = {...this.state.v1}

    // get current chat data
    const chat = v1.chats[chatId];

    // push new message to chat
    chat.messages.push(chatData);

    // update message count in chat
    chat.count = chat.count + 1 || 1;

    // Add author to 'watch' list for chat.
    // This would only be needed for a Teacher as they can access a Chat
    // without being 'invited', via 'admin mode'.
    // If they post a message they should get invited from then on.
    if (!chat.viewers.includes(chatData.author)) {
      chat.viewers.push(chatData.author);
    }

    // set state
    this.setState({ v1 });
  }

  addViewersToMessage(chatId, chatData){
    console.log(`index has chatData as ${chatData} and chatId as ${chatId}`)
    const v1 = {...this.state.v1}

    const chat = v1.chats[chatId];
    let viewers = chat.viewers;
    const users = v1.users;

    //add chosen users to chatX.viewers list
    const allViewers = viewers.concat(chatData.messageContent);
    v1.chats[chatId].viewers = allViewers;

    //add message to chatX.messages
    chat.messages.push(chatData);

    //update message count
    chat.count += 1;

    //set state
    this.setState({ v1 });

    //add chat to users userX.messageHistory:
    //for each new user
    for (const userId of chatData.messageContent) {
      // if user used to be in chat we shouldn't reset their count
      let count = 0;
      if (users[userId].messageHistory) {
        if (users[userId].messageHistory[chatId]) {
          count = users[userId].messageHistory[chatId]
        }
      }
      this.updateUserMessageHistory(userId,chatId,count)
    }
  }

  leaveChat(chatId, chatData){
    const v1 = {...this.state.v1}
    const chat = v1.chats[chatId];
    const users = v1.users;

    //remove userId from chatX.viewers
    const i = chat.viewers.indexOf(chatData.author);
      if(i !== -1) {
        chat.viewers.splice(i, 1);
      }

    //add message to chatX.messages
    chat.messages.push(chatData);

    //update message count
    chat.count += 1;

    //update users history to include this message (technically they don't see it but it would be dumb to count it)
    users[chatData.author].messageHistory[chatId] += 1;

    //set state
    this.setState({ v1 });

  }  

  updateCount(userId, chatId) {
    //updates Users count to match total message count in currenty viewed Chat
    //Called by ChatView.js on ComponentWillMount
    const newCount = this.state.v1.chats[chatId].count;
    this.updateUserMessageHistory(userId,chatId,newCount)
  }

  updateUserMessageHistory(userId,chatId,count) {
    // called by various functions in index.

    const v1 = {...this.state.v1};
    // set userHistory equal to current users messageHistory or empty object
    let userHistory = v1.users[userId]['messageHistory'] || {};
    // set chat count in copy of users messageHistory to current chat count
    userHistory[chatId] =count;
    // set copy of state's messageHistory to equal the new copy we just made
    v1.users[userId]['messageHistory'] = {...userHistory};
    // set state
    this.setState({ v1 });
  }
  deleteChat(chatId) {
    //get copy of current state
    const v1 = {...this.state.v1}
    if (!v1.deletedChats) {
      v1.deletedChats = [];
    }
    //add chatId to list of deleted chats
    v1.deletedChats.push(chatId);

    //delete the chat
    v1.chats[chatId] = null;

    //should it stay in users messageHistory? Probably not.
    for (const user in v1.users) {
      if(user.messageHistory && user.messageHistory[chatId]){
        user.messageHistory[chatId] = null;
      }
    }
    //update current state
    this.setState({ v1 });

  }

  resetData() {
    const setNull = null;
    const v1 = {
      users: importUsers,
      chats: importChats
    };
    this.setState({ v1: setNull });
    this.setState({ v1 });
  }

  changeUser(userId) {
    const currentUser = this.state.v1.users[userId];
    this.setState({currentUser});
    localStorage.setItem(`v1-signedInAs`,currentUser.userId);
  }

  render(){
    if (!this.state.loading) {
      const user = this.state.currentUser;
      return (
        <BrowserRouter>
          <div>
            <Match exactly pattern="/" component={() => <Dashboard user={user}/>}/>
            <Match pattern="/chat" component={
              () => <App 
                      updateCount={this.updateCount} 
                      user={user} 
                      chats={this.state.v1.chats} 
                      addMessage={this.addMessage}
                      addViewersToMessage={this.addViewersToMessage}
                      allUsers={this.state.v1.users}
                      leaveChat={this.leaveChat}
                      deleteChat={this.deleteChat}
                      />
            }/>

            <Match pattern="/switch" exactly component={
              () => 
              <SwitchUser 
              user={user} 
              allUsers={this.state.v1.users} 
              changeUser={this.changeUser} /> 
            }/>



            <Match pattern={`/new-chat`} exactly component={
              () => 
              <NewChat 
                currentUser={user} 
                users={this.state.v1.users} 
                addChat={this.addChat}/>
            }/>

            <Miss component={() => <NotFound user={user}/>}/>


          </div>
        </BrowserRouter>
      )    
    } else{
      return <p>loading</p>
    }
  }

}

render(
	<Root />,
	document.querySelector('#main')
);