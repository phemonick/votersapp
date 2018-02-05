import React, { Component } from 'react'
import { StyleProvider, Container, Header, Left, Body, Title, Right, Content } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Dimensions, StyleSheet, TouchableOpacity, Image, Text, View, CheckBox, TextInput, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import RNFB from 'react-native-fetch-blob'

class Manifest extends Component {
    constructor() {
        super()
        this.state = {
            
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
    render() {
        return (
                <StyleProvider style={getTheme(material)}>
                    <Container style={styles.container}>
                        <Header style={{ marginTop: (( Dimensions.get('window').height) * 0.024)}}>
                            <Left>
                                <TouchableOpacity onPress={() => Actions.drawerOpen()} activeOpacity = {0.8}>
                                    <Image source={require('../img/icons-02.png')} style={styles.open}/>
                                </TouchableOpacity>
                            </Left>
                            <Body>
                                <Title style={{fontSize: (( Dimensions.get('window').height) * 0.024)}}>ATIKU'S VOTERS APP</Title>
                            </Body>  
                        </Header>
                        <Text style={styles.topic} > GETTING YOUR PVC </Text>
                        <Content>
                            <TouchableOpacity  onPress={()=> Actions.opportunity()}>
                            <Grid style={styles.grid}>
                                <View style= {{backgroundColor: '#eee', height: 120, width: '36%'}} >
                                    <Image style={styles.img} source = {require('../img/icons-21.png')} />
                                </View>
                                <View style= {{backgroundColor: '#eee', height: 120, width: '52%'}} >
                                    <Text style = {styles.info} > You don't have a PVC? </Text>
                                    <Text style = {styles.subinfo} > Click to get List of Registration Centres </Text>
                                </View>
                            </Grid>
                            </TouchableOpacity>
                        </Content>
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
    grid: {
        alignSelf: 'center',
        marginTop: '10%'
    },
    img: {
        width: 80,
        height: 80,
        marginTop: '10%',
        marginBottom: '10%',
        alignSelf: 'center'

    },
    info: {
        marginTop: '15%',
        fontSize: (( Dimensions.get('window').height) * 0.026)
    },
    subinfo: {
        fontSize: (( Dimensions.get('window').height) * 0.018),
        marginTop: '1%'
    }
   


})

export default Manifest