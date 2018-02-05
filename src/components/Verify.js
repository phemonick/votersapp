import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, AsyncStorage, TextInput, TouchableOpacity, Dimensions, Picker, BackHandler, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import CodeInput from 'react-native-confirmation-code-input';
import axios from 'axios'

export default class Verify extends Component{
    constructor() {
        super()
        this.state = {
            token: '' 
        }
    }

    async store(payload){
        try {
            
            await AsyncStorage.setItem('#1THRU3#',payload).then((val)=>{
                if(val){
                    console.log({"stored item error":val})
                    
                }
                else{
                    console.log({SUCCESS: payload})
                    this.authUser = payload
                }
            })
            
          } catch (error) {
            console.log('err', error)
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
      async verify(code) {
          console.log("called", code, this.props.data)
          this.store("this.props.data")
        var params = new URLSearchParams();
        params.append('user_id', this.props.data);
        params.append('token', code);
        axios.post('http://api.atikuvotersapp.org/verifytoken', params)
        .then(response => {
            console.log({VerifyRes:response})
            if(response.data.status !== 'false') {
                console.log(response)
                this.store(this.props.data)
               Actions.home()
               console.log(code)
            }
            else {
                ToastAndroid.show('Token incorrect', ToastAndroid.SHORT);
            }
        })
        .catch(err => console.log(err)) 
      }
    
    render(){

        return(

            <ImageBackground source={require('../img/bg-32.png')} style={styles.bgImg} >
            <KeyboardAvoidingView style={styles.container}>
                <Image source={require('../img/icons-24.png')} style={styles.logo}/>
                <View style={ styles.bottom  } >
                <Text style = {styles.instruction}> Verify Your Phone Number </Text> 
                <Text style = {styles.instruction}> Enter Five Digit Code</Text>
                    <View style={ styles.code  }> 
                        <CodeInput
                            ref="codeInputRef1"
                            secureTextEntry
                            className={'border-b'}
                            codeLength={5}
                            space={5}
                            cellBorderWidth={3}
                            size={30}
                            autoFocus={false}
                            inputPosition='left'
                            onFulfill={(code) => {
                                this.setState({
                                    token: code
                                })
                                this.verify(code)
                            }}
                        />
                    </View>
                </View>
                    <View style={styles.buttonContainer}>
                        <Button onPress={() => Actions.home()} containerStyle={styles.butCont} style={styles.button}>Verify</Button>
                        <Button onPress={() => Actions.verify()} containerStyle={styles.butCont} style={styles.button}>Resend Code</Button>                 
                    </View>
                        
            </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
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
        justifyContent: 'center',
    },
    logo: {
        width:  (( Dimensions.get('window').height) * 0.23),
        height:  (( Dimensions.get('window').height) * 0.23),
        marginLeft: '31%',
        marginTop: '8%'
    },
      dob: {
          marginTop: '3%',
          width: '80%',
          alignSelf: 'center'
      },
      signup: {
          fontSize:  (( Dimensions.get('window').height) * 0.025),
          color: '#fff',
      },
      instruction: {
        marginTop: '5%',
        textAlign: 'center',
        fontSize:  (( Dimensions.get('window').height) * 0.023),
        color: '#fff'
    },
    code: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '8%'
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
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignSelf: 'center'
      }
})
