import React, { Component } from 'react'
import { StyleProvider, Container, Header, Left, Body, Title, Right, Icon, ListItem, Content } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Dimensions, StyleSheet, TouchableOpacity, Image, Text, View, CheckBox, TextInput, BackHandler, Clipboard, AsyncStorage, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import { Share } from 'react-native'

class Manifest extends Component {
    constructor() {
        super()
        this.state = {
            text: 'djnjnfg'
        }
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
          message: 'Such sharing! Much wow!'
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
                                <Title style={{fontSize: (( Dimensions.get('window').height) * 0.024)}}>ATIKU'S VOTERS APP</Title>
                            </Body>  
                        </Header>
                        <Text style={styles.topic} > REFER A FRIEND </Text>
                        <Content style={styles.content}>
                           <Text style={styles.subtopic}>Your Referral Link</Text>
                           <Text style={styles.subtopic2}>vjcbhjb</Text>
                           <Button onPress={() => this.writeToClipboard()} containerStyle={styles.butCont} style={styles.button}>Share</Button>
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
        marginTop: '4%',
        backgroundColor: '#5cb85c',
        color: '#fff',
        padding: '12%'

      },
      butCont: {
        marginTop: '20%',
        borderRadius: 5,
        width: '85%',
        alignSelf: 'center'
      },
      content: {
        marginTop: '26%',
        alignSelf: 'center'
    },
    subtopic: {
        alignSelf: 'center',
        fontSize:  (( Dimensions.get('window').height) * 0.023)
    },
    subtopic2: {
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

export default Manifest