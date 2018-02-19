import React, { Component } from 'react'
import { AdMobBanner } from 'react-native-admob'
import { StyleProvider, Container, Header, Left, Body, Title, Right, Content } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Dimensions, StyleSheet, TouchableOpacity, Image, Text, View, BackHandler, Alert, Platform } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'react-native-fetch-blob'
import axios from 'axios'

class Pvc extends Component {
    constructor() {
        super()
        this.state = {
            progress: 0,
            message: "",
            downloaded: '',
            url: ''
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        this.urlget()
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
      urlget() {
        axios.get('http://api.atikuvotersapp.org/regcenters')
        .then(response => {
            console.log( response.data.message[0].name)
            this.setState({url: response.data.message[0].name})
        })
      }
      getpvc(pdf) {
        if (Platform.OS === 'android') {
        let dirs = RNFetchBlob.fs.dirs
        RNFetchBlob
        .config({
            addAndroidDownloads : {
                useDownloadManager : true, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                notification : false,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                description : 'File downloaded by download manager.'
            },
            path: dirs.DownloadDir+ `/regcenters.pdf`
        })
        .fetch('GET', this.state.url)
        .progress({count: 10},(received, total) => {
            this.setState({
                progress: ((received / total)),
                animated: true
            })
            
        })
        .then((res) => {
            console.log(res)
           
        })
        .then(res => Alert.alert('Saved', 'Photo added to camera roll!'))
        .then(res => RNFetchBlob.fs.scanFile([{path}]))
        } else {
        console.log(res)
        }
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
                                <Title style={styles.title}>ATIKU'S VOTERS APP</Title>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => Actions.pop()} style={styles.touchable} activeOpacity = {0.8}>
                                    <Image source={require('../img/back.png')} style={styles.open}/>
                                </TouchableOpacity>    
                            </Right>  
                        </Header>
                        <Text style={styles.topic} > GETTING YOUR PVC </Text>
                        <Content>
                            <TouchableOpacity  onPress={(pdf)=> this.getpvc(this.state.url)}>
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
                        <AdMobBanner
                            style={styles.banner}
                            adSize="fullBanner"
                            adUnitID="ca-app-pub-6559209856638953/7836208719"
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
    grid: {
        alignSelf: 'center',
        marginTop: '10%'
    },
    title: {
        fontSize: (( Dimensions.get('window').height) * 0.024), 
        position: 'absolute',
        top: '-18%',
        left: '26%'
    },
    img: {
        width: 80,
        height: 80,
        marginTop: '10%',
        marginBottom: '10%',
        alignSelf: 'center'

    },
    info: {
        color: '#000',
        marginTop: '15%',
        fontSize: (( Dimensions.get('window').height) * 0.026)
    },
    subinfo: {
        color: '#000',
        fontSize: (( Dimensions.get('window').height) * 0.018),
        marginTop: '1%',
        marginLeft: '1%'
    },
    banner: {
        opacity: 0,
        position: 'absolute',
        bottom: -200
    }


})

export default Pvc