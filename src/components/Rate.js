import React, { Component } from 'react'
import { AdMobBanner } from 'react-native-admob'
import { StyleProvider, Container, Header, Left, Body, Title, Right, ListItem, Content, Icon } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Button from 'react-native-button'
import { Dimensions, StyleSheet, TouchableOpacity, Image, Text, View, CheckBox, TextInput, ToastAndroid } from 'react-native'
import { Actions } from 'react-native-router-flux'
import StarRating from 'react-native-star-rating'
import axios from 'axios'


class Rate extends Component {
    constructor() {
        super()
        this.state = {
            starCount: 0
        }
    }
    
    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }
      submitrate() {

        var params = new URLSearchParams();
        params.append('rate', this.state.starCount);
        params.append('user_id', '60');
        axios.post('http://api.atikuvotersapp.org/rate', params)
        .then(response => {
            if(response.data.status == 'true') {
                this.setState({
                    message: response.data.message
                })
                console.log(this.state.id)
                ToastAndroid.show('Rated', ToastAndroid.SHORT);
                Actions.home()
                console.log(response)
            }
            else {
                this.setState({
                    message: response.data.message
                })
                
            }
            
        })
        .catch(err => ToastAndroid.show('Failed! Check internet connection', ToastAndroid.SHORT)) 
  }
    
    render() {
        console.log(this.state)
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
                    <Text style={styles.topic}> RATE ATIKU </Text>
                    <Image style={styles.image} source={require('../img/atiku.jpg')} />
                    <View style={styles.rate}>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            emptyStar={'ios-star-outline'}
                            fullStar={'ios-star'}
                            iconSet={'Ionicons'}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            starColor={'#008841'}
                        />
                    </View>
                    <Content style={styles.content}>
                        <Button onPress={() =>this.submitrate()} containerStyle={styles.butCont} style={styles.button}>Rate</Button>
                    </Content>
                    <AdMobBanner
                        style={styles.banner}
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-6762059104295133/2278914333"
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
    check: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        marginTop: '4%',
        borderWidth: 1,
        borderColor: '#999',
        width: '90%',
        alignSelf: 'center',
        textAlignVertical: 'top',
        fontSize: (( Dimensions.get('window').height) * 0.018)
    },
    signup: {
        fontSize:  (( Dimensions.get('window').height) * 0.025),
        color: '#fff',
    },
    
      image: {
        width:  (( Dimensions.get('window').height) * 0.35),
        height:  (( Dimensions.get('window').height) * 0.35),
        alignSelf: 'center',
        marginTop: '8%'
      },
      rate: {
          marginTop: '5%',
          width: '75%',
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
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap'
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

export default Rate