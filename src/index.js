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

    this.updateCount = this.updateCount.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.addViewersToMessage = this.addViewersToMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.resetData = this.resetData.bind(this);
    this.leaveChat = this.leaveChat.bind(this);
    this.addChat = this.addChat.bind(this);

    this.state = {
      v1: {
        chats: {},
        users: {}
      },
      currentUser: ""
    }
  }

  componentWillMount() {
    let signedInAs = null;
    this.setState({
      currentUser: signedInAs || importUsers['u545sdd']
    })
    this.ref = base.syncState(`/v1`,{
      context: this,
      state: 'v1'
    })

    // console.log(this.state.users)
    // if (!this.state.users[0]) {
    //   this.setState({
    //     users: importUsers
    //   })
    // }
  }

  addChat(chatData) {
    //get copy of current state
    const v1 = {...this.state.v1};
    //get date created
    const chatDate = chatData.message.dateCreated;

    //create new chat object
    const chat = {
      chatId: `chat${chatDate}`,
      title: chatData.title,
      dateCreated: chatDate,
      count: 1,
      viewers: chatData.viewers,
      messages: [chatData.message]
    };
    //add it to v1 copy:
    v1.chats[chat.chatId] = chat;


    //add chat to users userX.messageHistory:
    const users = v1.users;
    //for each new user
    for (const userId of chatData.viewers) {
      //add chatX to messageHistory with value of 1 or 0
      if (users[userId].messageHistory) {
        users[userId].messageHistory[chat.chatId] = 0;
      } else {
        users[userId].messageHistory = {
          [chat.chatId]: 0
        }
      }
    }
    //set state
    this.setState({ v1 });
  }

  addMessage(chatId, chatData) {
    //get copy of current state
    const v1 = {...this.state.v1}
    const chat = v1.chats[chatId];
    //push message to chat
    chat.messages.push(chatData);
    //update message count
    chat.count = chat.count + 1 || 1;
    //add author to 'watch' list
    if (!chat.viewers.includes(chatData.author)) {
      chat.viewers.push(chatData.author);
    }
    //set state
    this.setState({ v1 });
  }

  addViewersToMessage(chatId, chatData){
    console.log(`index has chatData as ${chatData} and chatId as ${chatId}`)
    const v1 = {...this.state.v1}

    const chat = v1.chats[chatId];
    let viewers = chat.viewers;
    const users = v1.users;

    //add chat to users userX.messageHistory:
    //for each new user
    for (const userId of chatData.messageContent) {
      // if user used to be in chat we shouldn't reset their count

      //if user has no messageHistory:
      if (!users[userId].messageHistory) {
        // create MessageHistory object and set current chat
          users[userId].messageHistory = {
            [chatId]:0
          } 
      } 
      // if user has messageHistory and has not got history for this chat
      else if (users[userId].messageHistory && ! users[userId].messageHistory[chatId]) {
        users[userId].messageHistory[chatId] = 0;
      }


    }

    //add chosen users to chatX.viewers list
    const allViewers = viewers.concat(chatData.messageContent);
    v1.chats[chatId].viewers = allViewers;

    //add message to chatX.messages
    chat.messages.push(chatData);

    //update message count
    chat.count += 1;

    //set state
    this.setState({ v1 });

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
    const v1 = {...this.state.v1}
    if (v1.users[userId]) {
      const newCount = v1.chats[chatId].count;
      v1.users[userId]['messageHistory'][chatId] = newCount;
      this.setState({ v1 });
    }
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
    console.log(`don't forget to persist to local storage at some point`);
  }

  render(){
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
  }

}

render(
	<Root />,
	document.querySelector('#main')
);