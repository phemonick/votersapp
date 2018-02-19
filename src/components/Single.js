import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text, StyleProvider,  Content, Card, CardItem } from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Actions } from 'react-native-router-flux';
import { Platform, BackHandler, Image, Alert, TouchableOpacity, View, StatusBar, Dimensions, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { AdMobBanner } from 'react-native-admob'

const styles = StyleSheet.create({
    headerShow: {
        elevation: 0,
        position: 'absolute', 
        backgroundColor: 'rgba(0, 0, 0, 0)', 
        zIndex: 1, 
        marginTop: (( Dimensions.get('window').height) * 0.038)
    },
    headerHide: {
        display: 'none'
    },
    cardShow: {
        position: 'absolute', 
        bottom: '0%', 
        backgroundColor: '#222', 
        opacity: 0.7, 
        width: Dimensions.get('window').width, 
        height: ((Dimensions.get('window').height) * 0.15)
    },
    cardHide: {
        display: 'none'
    },
    downloadText: {
        color: '#fff',  
        fontSize: (( Dimensions.get('window').height) * 0.0165)
    },
    titleText: {
        color: "#FFF", 
        fontSize: (( Dimensions.get('window').height) * 0.024)
    },
    creatorText: {
        color: "#EEE", 
        fontSize: (( Dimensions.get('window').height) * 0.02)
    },
    resolutionText: {
        color: '#fff',  
        fontSize: (( Dimensions.get('window').height) * 0.0165)
    },
    banner: {
        opacity: 0,
        position: 'absolute',
        bottom: -200
    },
})

class Single extends Component {
    constructor() {
        super();
        this.state = {
            show: false
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
 
    toggleStatus() {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const image = this.props.data
        return(
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header style={[styles.headerShow, this.state.show && styles.headerHide]}>
                    <StatusBar
                        backgroundColor="rgba(0, 0, 0, 0)"
                        translucent={true}
                    />
                        <Left>
                            <Button transparent onPress={() => Actions.pop()} style={{marginTop: 5}}>
                                <Icon name='arrow-back' style={{fontSize: (( Dimensions.get('window').height) * 0.024)}} />
                            </Button>
                        </Left>
                        <Right>
                            <Button iconRight transparent>
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <CardItem cardBody>
                            <TouchableWithoutFeedback onPress={() => {
                                this.toggleStatus()
                            }}>
                                <Image
                                    resizeMode = "cover"
                                    style = {{ flex: 1, width: null, height: Dimensions.get('window').height }}
                                    source={{uri: this.props.data.name}}
                                />
                            </TouchableWithoutFeedback>
                            <CardItem style={[styles.cardShow, this.state.show && styles.cardHide]}>
                                <View style={{flex: 1, bottom: '10%'}}>
                                    <Text style={styles.titleText}>{this.props.data.captions}</Text>
                                </View>
                                <AdMobBanner
                                    style={styles.banner}
                                    adSize="fullBanner"
                                    adUnitID="ca-app-pub-6762059104295133/6385651080"
                                   
                                />
                            </CardItem>
                        </CardItem>
                    </Content> 
                </Container>
            </StyleProvider>
        )
    }
  }

  export default Single