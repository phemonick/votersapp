import React from 'react';
import { View, Text, AsyncStorage , StyleSheet, BackHandler, Dimensions, TouchableOpacity, Image, TextInput} from 'react-native';
import { StyleProvider, Container, Header, Left, Right, Body, Title} from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import BackgroundTimer from 'react-native-background-timer'
import { GiftedChat } from 'react-native-gifted-chat';
window.navigator.userAgent = 'react-native'
 const io = require('react-native-socket.io-client/socket.io');
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

const USER_ID = '@userId';

class Chat extends React.Component {
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
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
      // axios.get(`http://api.atikuvotersapp.org/users/${this.props.data.id}`)
      // .then(response => { 
      //       this.setState({
      //           userId: response.data.message[0].email,
      //           user1un: response.data.message[0].name
      //       })
          
      // })
        
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
   onBackPress () {
    if (Actions.state.index === 0) {
      return false;
    }

    Actions.pop();
    return true;
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
          user1id: 'wilson@gmail.com',
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
      console.log(this.state)
    var user = { _id: this.state.userId || -1 };

    return (
      <StyleProvider style={getTheme(material)}>
          <Container style={styles.container}>
              <Header style={{ marginTop: (( Dimensions.get('window').height) * 0.024)}}>
                  <Left>
                    <TouchableOpacity onPress={() => Actions.drawerOpen()} style={styles.touchable} activeOpacity = {0.8}>
                        <Image source={require('../img/icons-02.png')} style={styles.open}/>
                    </TouchableOpacity>
                  </Left>
                  <Body>
                    <Title style={styles.title}>CHAT WITH ATIKU</Title>
                  </Body>
                  <Right>
                    <TouchableOpacity onPress={() => Actions.pop()} style={styles.touchable} activeOpacity = {0.8}>
                        <Image source={require('../img/back.png')} style={styles.open}/>
                    </TouchableOpacity>    
                  </Right>  
              </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: 'wilson@gmail.com',
            name: 'wilson'
          }}
          textInputProps={{
            style: styles.chatT
          }}
        />
    </Container>
  </StyleProvider>

      
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

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#FFF',
  },
  chatT: {
    color: '#000',
    width: '100%'
  },
  open: {
      width:  (( Dimensions.get('window').height) * 0.025),
      height:  (( Dimensions.get('window').height) * 0.025),
      marginTop: '9%',
      marginLeft: '4%'

  },
  
  topic: {
      color: '#008841',
      fontSize: (( Dimensions.get('window').height) * 0.025),
      marginTop: '5%',
      alignSelf: 'center' 
  },
  checks: {
      color: '#000',
      marginLeft: '1%'
  },
  title: {
    fontSize: (( Dimensions.get('window').height) * 0.024), 
    position: 'absolute',
    top: '-18%',
    left: '26%'
},
  box:{
      flex: 1,
      justifyContent: 'center'
      
  },
  check: {
      display: 'flex',
      flexDirection: 'row'
  },
  input: {
      color: '#000',
      marginTop: '3%',
      borderWidth: 1,
      borderColor: '#999',
      width: '90%',
      alignSelf: 'center',
      textAlignVertical: 'top',
      fontSize: (( Dimensions.get('window').height) * 0.018)
  },
  signup: {
      fontSize:  (( Dimensions.get('window').height) * 0.025),
      color: '#fff',
  },
  button: {
      margin: '3%',
      backgroundColor: '#5cb85c',
      color: '#fff',
      padding: '8%'

    },
    butCont: {
      borderRadius: 5,
      width: '50%',
      alignSelf: 'center'
    },
    content: {
      marginTop: '3%'
  },
  banner: {
      opacity: 0,
      position: 'absolute',
      bottom: -200
  },
  checkbox: {
      backgroundColor: '#999'
  },
  widget: {
    backgroundColor: '#000',
  },
  

})

module.exports = Chat;

