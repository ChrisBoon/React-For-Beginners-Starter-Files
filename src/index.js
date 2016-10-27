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

class Root extends React.Component{
  constructor() {
    super();

    this.updateCount = this.updateCount.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.addViewersToMessage = this.addViewersToMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.resetData = this.resetData.bind(this);

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

  addMessage(chatId, chatData) {
    // get copy of current chat
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
      //add chatX to messageHistory with value of 0
      if (users[userId].messageHistory) {
        users[userId].messageHistory[chatId] = 0;
      } else {
        users[userId].messageHistory = {
          [chatId]:0
        }
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

  updateCount(userId, chatId) {
    const v1 = {...this.state.v1}
    if (v1.users[userId]) {
      const newCount = v1.chats[chatId].count;
      v1.users[userId]['messageHistory'][chatId] = newCount;
      this.setState({ v1 });
    }
  }

  resetData() {
    this.setState({
      v1: {
        users: importUsers,
        chats: importChats
      }
    })
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
                    />
          }/>

          <Match pattern="/switch" component={() => <SwitchUser 
            user={user} 
            allUsers={this.state.v1.users} 
            changeUser={this.changeUser} /> } />
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