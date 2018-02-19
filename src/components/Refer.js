import React, { Component } from 'react'
import { StyleProvider, Container, Header, Left, Body, Title, Right, Icon,  Content } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Dimensions, StyleSheet, TouchableOpacity, Image, Text, View,  BackHandler, Clipboard, AsyncStorage, ToastAndroid, Share } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import axios from 'axios'

class Refer extends Component {
    constructor() {
        super()
        this.state = {
            text: '',
            mycount: 0,
            cardCount: 0
        }
    }
    componentWillMount() {
        axios.get(`http://api.atikuvotersapp.org/users/${this.props.data.id}`)
        .then(response => { 
                this.setState({
                    text: response.data.message[0].mylink,
                    mycount: response.data.message[0].mycount,
                    cardCount: response.data.message[0].card_count,
                })
          console.log(response)
      })
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
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
      writeToClipboard = async () => {
        await Clipboard.setString(this.state.text);
        ToastAndroid.show('Copied to Clipboard', ToastAndroid.SHORT);
      };
      _shareTextMessage () {
        Share.share({
          message: "Download Atiku's Voters App from the Google Play Store. Go to https://play.google.com/store/apps/details?id=com.votersapp"
        })
        .then((result) => console.log(result))
        .catch(err => console.log(err))
      }
    render() {
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
                                <Title style={styles.title}>ATIKU'S VOTERS APP</Title>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => Actions.pop()} style={styles.touchable} activeOpacity = {0.8}>
                                    <Image source={require('../img/back.png')} style={styles.open}/>
                                </TouchableOpacity>    
                            </Right>  
                        </Header>
                        <Text style={styles.topic} > REFER A FRIEND </Text>
                        <Content style={styles.content}>
                           <Text style={styles.subtopic}>Refer 5 friends and get Recharge Card free.</Text>
                           <Text style={styles.subtopic}>Your Referral Code</Text>
                           <Text style={styles.subtopic2}>{this.state.text} | Referrals: {this.state.mycount} | Card Count: {this.state.cardCount}</Text>
                           <Button onPress={() => this.writeToClipboard()} containerStyle={styles.butCont2} style={styles.button2}>Copy</Button>
                        </Content>
                        <Content style={styles.shareContent}>
                            <Image source={require('../img/icons-24.png')} style={styles.logo}/>
                            <Text style={styles.subtopic}>Share the app with your friends</Text>
                            <Button onPress={() => this._shareTextMessage()} containerStyle={styles.butCont2} style={styles.button2}>Share</Button>
                        </Content>
                    </Container>
                </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF'
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
    button: {
        backgroundColor: '#5cb85c',
        color: '#fff',
        padding: '6%'

      },
      title: {
        fontSize: (( Dimensions.get('window').height) * 0.024), 
        position: 'absolute',
        top: '-18%',
        left: '25%'
    },
      butCont: {
        marginTop: '20%',
        borderRadius: 5,
        width: '50%',
        alignSelf: 'center'
      },
      content: {
        marginTop: '26%',
        alignSelf: 'center'
    },
    subtopic: {
        alignSelf: 'center',
        fontSize:  (( Dimensions.get('window').height) * 0.023),
        color: '#000'
    },
    subtopic2: {
        marginTop: '2%',
        fontSize:  (( Dimensions.get('window').height) * 0.023),
        alignSelf: 'center',
        color: '#008841'
    },
    logo: {
        width:  (( Dimensions.get('window').height) * 0.18),
        height:  (( Dimensions.get('window').height) * 0.18),
        marginLeft: '22%',
    },
    shareContent: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    },
    button2: {
        marginTop: '4%',
        backgroundColor: '#5cb85c',
        color: '#fff',
        padding: '10%'

      },
      butCont2: {
        marginTop: '15%',
        borderRadius: 5,
        width: '50%',
        alignSelf: 'center'
      },


})

export default Refer