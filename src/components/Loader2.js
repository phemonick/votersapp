import React, { Component } from 'react'
 import { ActivityIndicator, View, AsyncStorage, StyleSheet,  Dimensions } from 'react-native'
 import { Actions } from 'react-native-router-flux'
 
 
 export default class Loader extends Component {
     constructor() {
         super()
         this.state={
             condition: false,
             userdata: {} 
         }
     
     }
     componentDidMount(){
         this.checkToken();
         setTimeout(()=>{
             // Add your logic for the transition
                 Actions.home({data: this.state.userdata})
             
        }, 500)
     }
     async checkToken(){
     
         try {
             
             const value = await AsyncStorage.getItem('#1THRU3#')
             // const response = await value
             // console.log(response"in check token")
             if (value !== null){
                 // We have data!!
                 console.log(value);
                 let data = JSON.parse(value)
                 console.log({DataWeParsed: data})
                 this.setState({
                     condition: true,
                     userdata: data
                     
                 })
               }
               // We have data!!
             //   this.props.navigation.navigate('SignIn')
             
             else{
                 console.log('no token yet')
                 this.setState({
                     condition: false
                 })
             }
           } catch (error) {
               console.log(error)
             // Error retrieving data
           }
         }
     render() {
         return (
             <View style={styles.container}>
                 <ActivityIndicator size="large" color="#fff"/>
             </View>
         )
     }
 }
 
 const styles = StyleSheet.create({
     container: {
         backgroundColor: '#008841',
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center'
 
     },
     logo: {
         width:  (( Dimensions.get('window').height) * 0.23),
         height:  (( Dimensions.get('window').height) * 0.23),
        
     },
 })