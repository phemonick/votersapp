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
                    <TextInput
                            style={styles.input}
                            placeholderTextColor= {'#fff'}
                            fontFamily= 'Roboto'
                            // onChangeText={(text) => this.setState({userId: text})}
                            onSubmitEditing={Keyboard.dismiss}
                            underlineColorAndroid={'#fff'}
                            placeholder={'Name'}
                            multiline={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor= {'#fff'}
                            // onChangeText={(text) => this.setState({userId: text})}
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
                            // onChangeText={(text) => this.setState({userId: text})}
                            onSubmitEditing={Keyboard.dismiss}
                            fontFamily= 'Roboto'
                            keyboardType = 'numeric'
                            placeholder={'Phone Number'}
                            underlineColorAndroid={'#fff'}
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
                            selectedValue={this.state.residence}
                            style={styles.pick}
                            mode='dialog'
                            onValueChange={(itemValue, itemIndex) => this.setState({residence: itemValue})}>
                            <Picker.Item color='#fff' label="State of Residence" value="urban" />
                            <Picker.Item color='green' label="Rural" value="rural" />
                            {/* {data.map ((value)=><Picker.Item label={value} value={value} key={value}/>)} */}
                        </Picker>
                    </View>
                    <DatePicker
                        style={styles.dob}
                        date={this.state.date}
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
                                fontSize: 18,
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
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <Content>
                        <Button onPress={() => Actions.verify()} containerStyle={styles.butCont} style={styles.button}>Sign Up</Button>
                    </Content>
                    
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
        fontSize: (( Dimensions.get('window').height) * 0.02),
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


      }
})
