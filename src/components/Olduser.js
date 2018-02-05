import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TextInput, Keyboard, TouchableOpacity, Dimensions, Picker} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import DatePicker from 'react-native-datepicker'

export default class Login extends Component{
    constructor(){
        super();
        this.state = {
            gender: '',
            residence: '',
            userId: ''
        }
    }

    render(){
        return(
            <ImageBackground source={require('../img/bg-32.png')} style={styles.bgImg} >
            <View style={styles.container}>
                <Image source={require('../img/icons-24.png')} style={styles.logo}/>
                <View style={ styles.bottom  } >
                        <TextInput
                            style={styles.input}
                            placeholderTextColor= {'#fff'}
                            // onChangeText={(text) => this.setState({userId: text})}
                            onSubmitEditing={Keyboard.dismiss}
                            fontSize= {18}
                            fontFamily= 'Roboto'
                            keyboardType = 'numeric'
                            placeholder={'Phone Number'}
                            underlineColorAndroid={'#fff'}
                            multiline={false}
                        />
                   <View style={styles.buttonContainer}>
                        <Button onPress={() => Actions.home()} containerStyle={styles.butCont} style={styles.button}>Verify</Button>
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
        width: '80%',
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
