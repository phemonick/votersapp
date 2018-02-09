import React, { Component } from 'react'
import { AdMobBanner } from 'react-native-admob'
import { StyleProvider, Container, Header, Left, Body, Title, Right, Icon, ListItem, Content } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Button from 'react-native-button'
import { Dimensions, StyleSheet, TouchableOpacity, Image, Text, View, CheckBox, TextInput, BackHandler, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
// import 'url-search-params-polyfill';

class Issues extends Component {
    constructor() {
        super()
        this.state = {
            checked: false,
            checked2: false,
            checked3: false,
            other: 'National issue',
            disabled: false
            
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
    changeCheckValue = (value) => {
        this.setState({
            checked: !this.state.checked
        })
    }
    changeCheckValue2 = (value) => {
        this.setState({
            checked2: !this.state.checked2
        })
    }
    changeCheckValue3 = (value) => {
        this.setState({
            checked3: !this.state.checked3
        })
    }
    submitissue() {

        var params = new URLSearchParams();
        params.append('unemployment', this.state.checked);
        params.append('security', this.state.checked2);
        params.append('electricity', this.state.checked3);
        params.append('others', this.state.other);
        params.append('user_id', this.props.data.id);
        this.setState({disabled: true})
        axios.post('http://api.atikuvotersapp.org/addnationalissue', params)
        .then(response => {
            if(response.data.status == 'true') {
                this.setState({
                    message: response.data.message
                })
                console.log(this.state.id)
                ToastAndroid.show('Done', ToastAndroid.SHORT);
                Actions.pop()
                console.log(response)
            }
            else {
                this.setState({
                    message: response.data.message,
                    disabled: false
                })
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
                
            }
            
        })
        .catch(err => ToastAndroid.show('Failed! Check internet connection', ToastAndroid.SHORT)) 
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
                    <Text style={styles.topic} > NATIONAL ISSUES</Text>
                    <Content>
                        <ListItem>
                            <CheckBox style={styles.checkbox} value={this.state.checked} 
                            onChange={() => this.changeCheckValue()}/>
                            <Body>
                            <Text style={styles.text}>Unemployment</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <CheckBox style={styles.checkbox} value={this.state.checked2} 
                            onChange={() => this.changeCheckValue2()}/>
                            <Body>
                            <Text style={styles.text}>Security</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <CheckBox style={styles.checkbox} value={this.state.checked3} 
                            onChange={() => this.changeCheckValue3()}/>
                            <Body>
                            <Text style={styles.text}>Electricity</Text>
                            </Body>
                        </ListItem>
                            <TextInput
                            style={styles.input} 
                            multiline = {true}
                            numberOfLines = {8}
                            onChangeText={(other) => this.setState({other})}
                            underlineColorAndroid={'transparent'}
                            style= { styles.input }
                            placeholderTextColor = {"#000"}
                            placeholder = { 'Additional information'}
                        />
                         <Content style={styles.content}>
                            <Button onPress={() => this.submitissue()} 
                             styleDisabled={{backgroundColor: '#999', opacity: 0.5}}
                             disabled={this.state.disabled}
                            containerStyle={styles.butCont} 
                            style={styles.button}>Submit</Button>
                        </Content>
                        
                        </Content>
                        <AdMobBanner
                            style={styles.banner}
                            adSize="fullBanner"
                            adUnitID="ca-app-pub-6762059104295133/4352963230"
                        />
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
    box:{
        flex: 1,
        justifyContent: 'center'
        
    },
    title: {
        fontSize: (( Dimensions.get('window').height) * 0.024), 
        position: 'absolute',
        top: '-18%',
        left: '26%'
    },
    text: {
        color: '#000',
        marginLeft: '1%'
    },
    checkbox: {
        backgroundColor: '#999'
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
    }

})

export default Issues