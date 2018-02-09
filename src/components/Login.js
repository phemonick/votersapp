import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TextInput, Keyboard, TouchableOpacity, Dimensions, Picker, BackHandler, ToastAndroid, ScrollView} from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import DatePicker from 'react-native-datepicker'
import data  from './StateData'
import axios from 'axios'
// import 'url-search-params-polyfill';

export default class Login extends Component{
    constructor(){
        super();
        this.state = {
           name: '',
           gender: '',
           state: '',
           mobile: '',
           email: '',
           dob: '',
           upline: '',
           id: '',
           message: '',
           disabled: false

        }
    }
    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
      }
    
      componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
    
      onBackPress () {
       BackHandler.exitApp()
      }
      signup() {
          Actions.home()
        // Actions.verify({data: this.state})
        // var params = new URLSearchParams();
        // params.append('name', this.state.name);
        // params.append('gender', this.state.gender);
        // params.append('email', this.state.email);
        // params.append('state', this.state.state);
        // params.append('mobile', this.state.mobile);
        // params.append('dob', this.state.dob);
        // params.append('upline', this.state.upline);
        // this.setState({disabled: true})
        // axios.post('http://api.atikuvotersapp.org/addusers', params)
        // .then(response => {
        //     if(response.data.status == 'true') {
        //         this.setState({
        //             id: response.data.details
        //         })
        //         console.log(this.state.id)
        //         Actions.verify({data: this.state})
        //         console.log(response)
        //     }
        //     else {
        //         this.setState({
        //             message: response.data.message,
        //             disabled: false
        //         })
        //         ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
        //         console.log({else:response})

        //     }
            
        // })
        // .catch(err => console.log(err)) 

      }
    render(){
        const items = data.map((item, i) => {
            return (
                <Picker.Item color='#fff' label={item.name} value={item.name.toLowerCase()} key={item.id} />
            )
        })
        return(
            <ImageBackground source={require('../img/bg-32.png')} style={styles.bgImg} >

            <View style={styles.container}>
                <Image source={require('../img/icons-24.png')} style={styles.logo}/>
                <ScrollView>
                    <TextInput
                            style={styles.input}
                            placeholderTextColor= {'#fff'}
                            fontFamily= 'Roboto'
                            onChangeText={(name) => this.setState({name})}
                            onSubmitEditing={Keyboard.dismiss}
                            underlineColorAndroid={'#fff'}
                            placeholder={'Name'}
                            multiline={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor= {'#fff'}
                            onChangeText={(email) => this.setState({email})}
                            onSubmitEditing={Keyboard.dismiss}
                            fontFamily= 'Roboto'
                            keyboardType = 'email-address'
                            placeholder={'Email'}
                            underlineColorAndroid={'#fff'}
                            multiline={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor= {'#fff'}
                            onChangeText={(mobile) => this.setState({mobile})}
                            onSubmitEditing={Keyboard.dismiss}
                            fontFamily= 'Roboto'
                            keyboardType = 'numeric'
                            placeholder={'Phone Number'}
                            underlineColorAndroid={'#fff'}
                            multiline={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor= {'#fff'}
                            fontFamily= 'Roboto'
                            onChangeText={(upline) => this.setState({upline})}
                            onSubmitEditing={Keyboard.dismiss}
                            underlineColorAndroid={'#fff'}
                            placeholder={'Referral code if any'}
                            multiline={false}
                        />
                    <View style={[styles.gender]} >
                        <Picker
                            selectedValue={this.state.gender} 
                            mode='dialog'
                            onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}>
                            <Picker.Item  color='#fff' label="Gender" value="Gender" />
                            <Picker.Item color='#fff' label="Male" value="Male" />
                            <Picker.Item color='#fff' label="Female" value="Female" />
                        </Picker>
                    </View>
                    <View style={[styles.local]} >
                        <Picker 
                            selectedValue={this.state.state}
                            style={styles.pick}
                            mode='dialog'
                            onValueChange={(itemValue, itemIndex) => this.setState({state: itemValue})}>
                            <Picker.Item  color='#fff' label="State of Residence" value="State of Residence" />
                            {items}
                        </Picker>
                    </View>
                    <DatePicker
                        style={styles.dob}
                        date={this.state.dob}
                        mode="date"
                        placeholder="Date of Birth"
                        format="YYYY-MM-DD"
                        minDate="1950-05-01"
                        maxDate="2000-01-01"
                        androidMode="spinner"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        showIcon={false}
                        customStyles={{
                            placeholderText: {
                                color: '#fff',
                                fontSize: 16,
                                alignSelf:'flex-start',
                                paddingLeft:10
                            },
                        dateInput: {
                            // marginLeft: 36,
                            borderWidth: null,
                            borderBottomWidth: 1,
                            borderColor: '#fff'
                        },
                        dateText:{
                            color: '#fff',
                            justifyContent: 'flex-start'
                          }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({dob: date})}}
                    />
                    <Content>
                        <Button onPress={() => {
                            this.signup()}}
                            containerStyle={styles.butCont}
                            style={styles.button}
                            styleDisabled={{backgroundColor: '#999', opacity: 0.5}}
                            disabled={this.state.disabled}
                           >Sign Up</Button>
                    </Content>
                    <Content>
                        <Text style={styles.olduser}onPress={() => Actions.olduser()}>Already a user? Verify phone number here</Text>
                    </Content>
                </ScrollView>      
            </View>
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
        justifyContent: 'center'
    },
    logo: {
        width:  (( Dimensions.get('window').height) * 0.23),
        height:  (( Dimensions.get('window').height) * 0.23),
        marginLeft: '31%',
        marginTop: '8%'
    },
    input: {
        marginTop: '2%',
        width: '80%',
        color: '#eee',
        fontSize: (( Dimensions.get('window').height) * 0.025),
        borderBottomColor:'#fff',
        alignSelf: 'center'
      },
      gender: {
        borderBottomWidth: 1,
        width: '79%',
        borderBottomColor:'#fff',
        alignSelf: 'center',
       
      },
      local: {
        borderBottomWidth: 1,
        width: '79%',
        borderBottomColor:'#fff',
        alignSelf: 'center',
       
      },
      dob: {
          marginTop: '3%',
          width: '80%',
          alignSelf: 'center'
      },
      button: {
        marginTop: '4%',
        backgroundColor: '#5cb85c',
        color: '#fff',
        padding: '5%'

      },
      butCont: {
        borderRadius: 5,
        padding: '8%',
        width: '80%',
        alignSelf: 'center'
      },
      signup: {
          fontSize:  (( Dimensions.get('window').height) * 0.03),
          color: '#fff',
      },
      olduser: {
        color: '#fff',
        marginBottom: '3%',
        alignSelf: 'center',
        fontSize:  (( Dimensions.get('window').height) * 0.023)
      }
})
