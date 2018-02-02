import React, { Component } from 'react'
import { StyleProvider, Container, Header, Left, Body, Title, Right, Icon, ListItem, Content } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import Button from 'react-native-button'
import { Dimensions, StyleSheet, TouchableOpacity, Image, Text, View, CheckBox, TextInput, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'

class Issues extends Component {
    constructor() {
        super()
        this.state = {
            checked: false
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
                            <TouchableOpacity onPress={() => Actions.drawerOpen()} style={styles.touchable} activeOpacity = {0.8}>
                                <Image source={require('../img/icons-02.png')} style={styles.open}/>
                            </TouchableOpacity>
                        </Left>
                        <Body>
                            <Title style={{fontSize: (( Dimensions.get('window').height) * 0.024)}}>ATIKU'S VOTERS APP</Title>
                        </Body>  
                    </Header>
                    <Text style={styles.topic} > NATIONAL ISSUES</Text>
                    <Content>
                        <ListItem>
                            <CheckBox value={this.state.checked} 
                            onChange={() => this.changeCheckValue()}/>
                            <Body>
                            <Text>Unemployment</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <CheckBox value={this.state.checked} 
                            onChange={() => this.changeCheckValue()}/>
                            <Body>
                            <Text>Security</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <CheckBox value={this.state.checked} 
                            onChange={() => this.changeCheckValue()}/>
                            <Body>
                            <Text>Electricity</Text>
                            </Body>
                        </ListItem>
                            <TextInput
                            style={styles.input} 
                            multiline = {true}
                            numberOfLines = {8}
                            underlineColorAndroid={'transparent'}
                            style= { styles.input }
                            placeholder = { 'Additional information'}
                        />
                         <Content style={styles.content}>
                            <Button onPress={() => Actions.rate()} containerStyle={styles.butCont} style={styles.button}>Submit</Button>
                        </Content>
                        
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
    box:{
        flex: 1,
        justifyContent: 'center'
        
    },
    check: {
        display: 'flex',
        flexDirection: 'row'
    },
    input: {
        marginTop: '3%',
        borderWidth: 1,
        borderColor: '#999',
        width: '90%',
        alignSelf: 'center',
        textAlignVertical: 'top',
        fontSize: (( Dimensions.get('window').height) * 0.018)
    },
    button: {
        margin: '3%',
        backgroundColor: '#5cb85c',
        color: '#fff',
        padding: '8%'

      },
      butCont: {
        borderRadius: 5,
        width: '50%',
        alignSelf: 'center'
      },
      content: {
        marginTop: '3%'
    }

})

export default Issues