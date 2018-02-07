import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import BackgroundTimer from 'react-native-background-timer'
import { GiftedChat } from 'react-native-gifted-chat';
window.navigator.userAgent = 'react-native'
 const io = require('react-native-socket.io-client/socket.io');

const USER_ID = '@userId';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null
    };
    // this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.socket = io('https://polar-forest-71145.herokuapp.com');
    this.socket.on('connect', ()=>{
        console.log('connected to server', this.socket.connected)
        this.socket.emit('register', 'wilson@gmail.com');
    })                         
    this.socket.on('message', this.onReceivedMessage.bind(this));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    // this.determineUser = this.determineUser.bind(this);
    
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket.on('disconnect', ()=>{
      console.log('disconnected')
    })
    setTimeout = BackgroundTimer.setTimeout.bind(BackgroundTimer)
    setInterval = BackgroundTimer.setInterval.bind(BackgroundTimer)
    clearTimeout = BackgroundTimer.clearTimeout.bind(BackgroundTimer)
    clearInterval = BackgroundTimer.clearInterval.bind(BackgroundTimer)
    
    // this.determineUser();
  }

  onReceivedMessage(messages) {
    console.log({messageReceived: messages})
    
    this._storeMessages(messages);
  }
  formatMessage(message){
    let obj = null
      message.map((message)=> {
         obj = {
           message: message.text,
          userId: 'wilson@gmail.com',
          user1un: 'wilson',
          user2id: 'admin2@gmail.com',
          status: 0,
          time: ''
        } 
      })
      console.log({formated: obj})
      return obj
  }

  formatoSaveMessage(message){
    let res = []
    let obj = {
      _id: Math.floor(Math.random() * 20),
      text: message.message,
      createdAt: new Date(),
      user: {
        _id: message.user1id,
        name: 'wilson'
      }
    }
    res.push(obj)
    console.log({formatedtosave: res})
    return res
  }
  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages=[]) {
    console.log(messages)
    let data = this.formatMessage(messages)
    this.socket.emit('msgadmin', data);
    this._storeMessages(messages);
  }

  render() {
    var user = { _id: this.state.userId || -1 };

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 'wilson@gmail.com',
          name: 'wilson'
        }}
      />
    );
  }

  // Helper functions
  _storeMessages(messages) {
    if(Array.isArray(messages)){
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
    }else{
      let data = this.formatoSaveMessage(messages)
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, data),
        };
      });
    }

  }
}
module.exports = Main;

