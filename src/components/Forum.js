import React from 'react';
import { View, Text, AsyncStorage , ImageBackground, StyleSheet, BackHandler, Dimensions, TouchableOpacity, Image, TextInput} from 'react-native';
import { StyleProvider, Container, Header, Left, Right, Body, Title} from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import BackgroundTimer from 'react-native-background-timer'
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
window.navigator.userAgent = 'react-native'
 const io = require('react-native-socket.io-client/socket.io');
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

const USER_ID = '@userId';

class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      user1un: ''
    };
    
    // this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.socket = io('https://polar-forest-71145.herokuapp.com');
    this.socket.on('connect', ()=>{
        console.log('connected to server', this.socket.connected)
        //should be dynamic
        this.socket.emit('register', this.state.userId);
    })                         
    // this.socket.on('message', this.onReceivedMessage.bind(this)); 
    // this.socket.on('f_message', ((message)=>{
    //   console.log({onReceivedMessage: message})
    // }));                                     
    this.socket.on('f_message', this.formatoSaveMessage.bind(this));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    // this.determineUser = this.determineUser.bind(this);
    
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket.on('disconnect', ()=>{
      console.log('disconnected')
    })
    setTimeout = (fn, ms = 0) => BackgroundTimer.setTimeout(fn, ms)
    setInterval = (fn, ms = 0) => BackgroundTimer.setInterval(fn, ms)
    clearTimeout = (fn, ms = 0) => BackgroundTimer.clearTimeout(fn, ms)
    clearInterval = (fn, ms = 0) => BackgroundTimer.clearInterval(fn, ms)
    
    // this.determineUser();
  }
  componentWillMount() {
    axios.get(`http://api.atikuvotersapp.org/users/56`)
    
    .then(response => { 
      console.log({responseWillMount: response})
          this.setState({
              userId: response.data.message[0].email,
              user1un: response.data.message[0].name
          })
      this.dataHistory();
          
      })
      // .then(response => axios.get(`http://api.atikuvotersapp.org/conversations/${this.state.userId}`))
      // .then(res => console.log(res));
      
    
  }
   dataHistory(){
     try{
      axios.get(`http://api.atikuvotersapp.org/forumhistory`)
      .then(response => { 
        console.log({history: response})
        this.getHistory(response.data.message)
      })
     }catch(err){
       console.log({
         errorInHistory: err
       })
     }
   }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // this.apiCall()
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
    
    // this._storeMessages(messages);
  }
  formatMessage(message){
    let obj = null
    console.log(this.state.userId, this.state.user1un)
      message.map((message)=> {
         obj = {
           message: message.text,
          user1id: this.state.userId,
          user1un: this.state.user1un,
          status: 0,
          time: ''
        } 
      })
      console.log({formated: obj})
      return obj
  }
  getHistory(message){
    message.map((messages)=>{
      let res = []
      let x = 1
      x++
    let obj = {
      _id: new Date()*x,
      text: messages.message,
      createdAt: messages.date,
      user: {
        _id: messages.sender_email,
        name: messages.sender_name,
        avatar: messages.sender_pix
      }
    }
    res.push(obj)
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, obj),
      };
    });
    
    console.log({getHistory: res})
    return res
    })
  }

  formatoSaveMessage(message){
    let res = []
    console.log({messagesToSave: message})
    let obj = {
      _id: Math.floor(Math.random() * 20),
      text: message.message,
      createdAt: new Date(),
      user: {
        _id: message.sender_email,
        name: message.sender_name,
        avatar: message.sender_pix
      }
    }
    res.push(obj)
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, obj)
      };
    });
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
    this.socket.emit('msgforum', data);
    this._storeMessages(messages);
  }

  renderBubble(props) { 
    if (props.isSameUser(props.currentMessage, props.previousMessage) && props.isSameDay(props.currentMessage, props.previousMessage)){
      return ( <Bubble {...props} 
      wrapperStyle={{
          left: {
            backgroundColor: '#dcf8c6',
            
          },
          right: {
            backgroundColor: '#26A65B'
          }
        }} />
    )}else{
      return ( 
        <View  > 
          <Text style={{color:'#26A65B'}}>{props.currentMessage.user.name}</Text>
        <Bubble {...props} 
        
          wrapperStyle={{
              left: {
                backgroundColor: '#dcf8c6',
                
              },
              right: {
                backgroundColor: '#26A65B'
              }
            }} />
          </View>)
    }
}
  

  render() {
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
                    <Title style={styles.title}> ATIKU</Title>
                  </Body>
                  <Right>
                    <TouchableOpacity onPress={() => Actions.pop()} style={styles.touchable} activeOpacity = {0.8}>
                        <Image source={require('../img/back.png')} style={styles.open}/>
                    </TouchableOpacity>    
                  </Right>  
              </Header>
              <ImageBackground style={styles.bg} source={require('../img/chatBg2.png')} >
              <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                  _id: this.state.userId,
                  name: this.state.user1un
                }}
                textInputProps={{
                  style: styles.chatT
                }}
                isAnimated = {true}
                renderBubble={this.renderBubble.bind(this)}
                
              />
              </ImageBackground>
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
    color: '#2C3E50',
    width: '80%'
  },
  open: {
      width:  (( Dimensions.get('window').height) * 0.025),
      height:  (( Dimensions.get('window').height) * 0.025),
      marginTop: '9%',
      marginLeft: '4%'

  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  
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
    left: '31%'
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

module.exports = Forum;
