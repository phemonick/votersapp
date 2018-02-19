import React, { Component } from 'react';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { StyleProvider, Container,View, Header, DeckSwiper, Card, CardItem, Text, Left, Body,Title, Content, Icon } from 'native-base';
import { StyleSheet, Dimensions, TouchableOpacity, Image, BackHandler, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
const data = [
    {
        topic: "WHAT IS PERMANENT VOTERS’ CARD (PVC)?",
        content: "The Permanent Voters’ Card (PVC) is a smart card-based (like your ATM card) Voter ID, which holds voter’s information such as bio-data, biometrics and passport photograph. The card technology provides adequate security features to reduce vulnerability to counterfeiting. It will be used for identification and authentication of voters during elections, starting from 2015.",
        img: <Image style={{width: '100%'}} source = {require('../img/pvc.png')} />,
        step : "STEP 1"
    },
    {
        topic: "AM I ELIGIBLE TO COLLECT PERMANENT VOTERS’ CARD (PVC)?",
        content: "The Independent National Electoral Commission (INEC) has stated that for you to get your PVC, you must: have registered before, have your name on the voters’ register, have a temporary voter card (TVC), have your identity confirmed if you have lost your TVC and be physically present at the collection centre to get your PVC.",
        img: <Image  style={{width: '100%'}} source = {require('../img/eligible.jpg')} />,
        step : "STEP 2"
    },
    {
        topic: "WHERE DO I COLLECT MY PVC?",
        content: "The distribution of the PVC will be at Polling Units (PU) spread across the state between the hours of 8:00am and 4:00pm. Those who are unable to collect theirs during the specified period can do so at the INEC office in their local government area (LGA) afterwards.",
        img: <Image  style={{width: '100%'}} source = {require('../img/location.jpg')} />,
        step : "STEP 3"
    }

]
export default class Guide extends Component {
    componentDidMount()  {
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
   
  render() {
    return (
        <StyleProvider style={getTheme(material)}>
            <Container style={styles.container}>
                <Header style={{ marginTop: (( Dimensions.get('window').height) * 0.024)}}>
                    <Left>
                        <TouchableOpacity onPress={() => Actions.pop()} activeOpacity = {0.8}>
                        <Image source={require('../img/icons-03.png')} style={styles.open}/>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={{marginLeft: '5%',fontSize: (( Dimensions.get('window').height) * 0.024)}}>VOTERS GUIDE</Title>
                    </Body>  
                </Header>
                <View>
                    <DeckSwiper
                        ref={(c) => this._deckSwiper = c}
                        dataSource={data}
                        renderEmpty={() =>
                        <View style={{ alignSelf: "center" }}>
                            <Text>Over</Text>
                        </View>
                        }
                        renderItem={item =>
                        <View style={styles.deck}> 
                            <Text style = {[styles.topic, styles.step]}> {item.step} </Text>
                                {item.img}
                            <ScrollView>
                                <Text style = {[styles.topic, styles.top]}>{item.topic} </Text>
                                <Text style={styles.cont}>{item.content} </Text>
                            </ScrollView>

                        </View>
                        }
                    />
                </View>
        </Container>
        </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#008841'
    },
    card: {
        backgroundColor: '#008841',
        height: Dimensions.get('window').height
    },
    carditem: {
        backgroundColor: '#008841',
    },
    text: {
        color: '#FFF'
    },
    name: {
        color: '#FFF'
    },
    open: {
        width:  (( Dimensions.get('window').height) * 0.025),
        height:  (( Dimensions.get('window').height) * 0.025),
        marginTop: '9%',
        marginLeft: '4%'
    
    },
    body: {
        marginTop: '10%',
        marginBottom: '5%'
    },
    deck: {
        backgroundColor: '#008841',
        height: Dimensions.get(`window`).height
    },
    img: {
        width: '100%'
    },
    topic: {
        alignSelf: 'center',
        color: '#fff',
        marginBottom: '6%',
        marginTop: '6%',
        textAlign: 'center',
        width: '80%',
    },
    cont: {
        color: '#fff',
        textAlign: 'center',
        width: '80%',
        alignSelf: 'center',
        marginBottom: '25%'
    }
    
    
})