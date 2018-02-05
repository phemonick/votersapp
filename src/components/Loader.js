import React, { Component } from 'react'
import { ActivityIndicator, View, AsyncStorage, StyleSheet, Image, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'


export default class Loader extends Component {
    constructor() {
        super()
        this.state={
            condition: false
        }
    
    }
    componentDidMount(){
        this.checkToken();
        setTimeout(()=>{
            // Add your logic for the transition
            if(this.state.condition){
                Actions.home()
            }
            else{
                Actions.login()
            }
            
       }, 2000)
    }
    async checkToken(){
    
        try {
            
            const value = await AsyncStorage.getItem('#1THRU3#')
            // const response = await value
            // console.log(response+"in check token")
            if (value !== null){
                // We have data!!
                console.log(value);
                this.setState({
                    condition: true
                    
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
                <Image source={require('../img/icons-24.png')} style={styles.logo}/>
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
