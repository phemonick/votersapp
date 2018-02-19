import React, { Component } from 'react';
 import { View, Text, Image, StyleSheet, ImageBackground, TextInput, Keyboard, TouchableOpacity, Dimensions, ToastAndroid, BackHandler} from 'react-native'
 import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
 import Button from 'react-native-button'
 import { Actions } from 'react-native-router-flux'
 import DatePicker from 'react-native-datepicker'
 import 'url-search-params-polyfill';
 import axios from 'axios'
 
 export default class Login extends Component{
     constructor(){
         super();
         this.state = {
            mobile: '',
            id: '',
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

        Actions.login();
        return true;
      }

     signin() {
        var params = new URLSearchParams();
        params.append('mobile', this.state.mobile);
        this.setState({disabled: true})
        axios.put('http://api.atikuvotersapp.org/signin', params)
        .then(response => {
            console.log(response)
            if(response.data.status !== 'false') {
                this.setState({
                    id: response.data.details,
                })
                console.log(response.data.details)
                Actions.verify2({data: this.state})
            }
            else {
                this.setState({
                    message: response.data.message,
                    disabled: false
                })
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                console.log({else:response})

            }
            
        })
        .catch(err => console.log(err)) 

      }
 
     render(){
         console.log(this.state)
         return(
            <ImageBackground source={require('../img/bg-32.png')} style={styles.bgImg} >
                <View style={styles.container}>
                <Image source={require('../img/icons-24.png')} style={styles.logo}/>
                    <View style={ styles.bottom }>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor= {'#fff'}
                            onChangeText={(text) => this.setState({mobile: text})}
                            onSubmitEditing={Keyboard.dismiss}
                            fontSize= {18}
                            fontFamily= 'Roboto'
                            keyboardType = 'numeric'
                            placeholder={'Phone Number'}
                            underlineColorAndroid={'#fff'}
                            multiline={false}
                        />
                        <View style={styles.buttonContainer}>
                            <Button onPress={() => this.signin()} 
                                containerStyle={styles.butCont} 
                                style={styles.button}
                                styleDisabled={{backgroundColor: '#999', opacity: 0.5}}
                                disabled={this.state.disabled}
                            >Verify</Button>
                        </View>
                    </View>
                </View>
            </ImageBackground>
         )
     }
 }
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         justifyContent: 'space-between'
     },
     open: {
         width:  (( Dimensions.get('window').height) * 0.025),
         height:  (( Dimensions.get('window').height) * 0.025),
         marginTop: '9%',
         marginLeft: '4%'
 
     },
     bgImg: {
         flex: 1,
         alignSelf: 'stretch',
         width: null,
         justifyContent: 'center'
     },
     logo: {
         width:  (( Dimensions.get('window').height) * 0.23),
         height:  (( Dimensions.get('window').height) * 0.23),
         marginLeft: '31%',
         marginTop: '8%'
     },
     input: {
         marginTop: '8%',
         width: '60%',
         color: '#eee',
         textAlign: 'center',
         
         fontSize: (( Dimensions.get('window').height) * 0.02),
         borderBottomColor:'#fff',
         alignSelf: 'center'
       },
      
       button: {
         margin: '3%',
         backgroundColor: '#5cb85c',
         color: '#fff',
         padding: '6%'
 
       },
       butCont: {
         borderRadius: 5,
         width: '50%',
         alignSelf: 'center'
       },
       buttonContainer: {
           marginTop: '3%',
           width: '80%',
           flex: 1,
           justifyContent: 'center',
           flexDirection: 'row',
           flexWrap: 'wrap',
           alignSelf: 'center'
       },
       signup: {
           fontSize:  (( Dimensions.get('window').height) * 0.03),
           color: '#fff',
 
 
       },
       olduser: {
         fontSize:  (( Dimensions.get('window').height) * 0.025)
       },
       bottom: {
         display: 'flex',
         flexDirection: 'column',
         height:  '45%',
         alignItems: 'center',
         justifyContent: 'space-around',
         marginBottom: '20%',
         
     },
 })