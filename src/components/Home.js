import React, { Component } from 'react';
import { AdMobBanner } from 'react-native-admob'
import {StyleProvider, Container, Header, Content, Left, Body, Title, Right } from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux'
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text, ScrollView , BackHandler} from 'react-native'


export default class Home extends Component {
    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
      }
    
      componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
    
      onBackPress () {
       BackHandler.exitApp()
      }
  
  render() {
    console.log(this.props.data)
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
                    <Title style={styles.title}>ATIKU'S VOTERS APP</Title>
                </Body>
                <Right>
                    <TouchableOpacity onPress={() => this. onBackPress()} style={styles.touchable} activeOpacity = {0.8}>
                        <Image source={require('../img/back.png')} style={styles.open}/>
                    </TouchableOpacity>    
                </Right>  
            </Header>
            <Image source={require('../img/icons-24.png')} style={styles.dp}/>
            <Content>
                <Grid style={styles.grid}>
                        <TouchableOpacity onPress={()=> Actions.guide()} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                            <Image style={styles.img}source = {require('../img/icons-10.png')} />
                            <Text style = {styles.info} > Voters Guide </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> Actions.promise()} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                            <Image style={styles.img}source = {require('../img/icons-15.png')} />
                            <Text style = {styles.info} > The Promise </Text>
                        </TouchableOpacity> 
                </Grid>
                <Grid style={styles.grid}>
                    <TouchableOpacity onPress={()=> Actions.manifest({data: this.props.data.id})} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-16.png')} />
                        <Text style = {styles.info} > Add Manifest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Actions.issues({data: this.props.data.id})} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-17.png')} />
                        <Text style = {styles.info} > National Issues </Text>
                    </TouchableOpacity> 
                </Grid>
                <Grid style={styles.grid}>
                    <TouchableOpacity onPress={()=> Actions.chat({data: this.props.data})} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-18.png')} />
                        <Text style = {styles.info} > Chat with Atiku </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Actions.rate({data: this.props.data.id})} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-19.png')} />
                        <Text style = {styles.info} > Rate Atiku </Text>
                    </TouchableOpacity> 
                </Grid>
                <Grid style={styles.grid}>
                    <TouchableOpacity onPress={()=> Actions.opportunity({data: this.props.data.id})} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-20.png')} />
                        <Text style = {styles.info} > Opportunity Center </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Actions.pvc()} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-21.png')} />
                        <Text style = {styles.info} > Getting Your PVC </Text>
                    </TouchableOpacity> 
                </Grid>
                <Grid style={styles.grid}>
                    <TouchableOpacity onPress={()=> Actions.campaign({data: this.props.data.id})} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-25.png')} />
                        <Text style = {styles.info} > Join the Atiku </Text>
                        <Text style = {styles.info} > Campaign</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Actions.refer({data: this.props.data})} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-09.png')} />
                        <Text style = {styles.info} > Refer a friend to </Text>
                        <Text style = {styles.info} > get Recharge card </Text>
                    </TouchableOpacity> 
                </Grid>
                <AdMobBanner
                    style={styles.banner}
                    adSize="fullBanner"
                    adUnitID="ca-app-pub-6762059104295133/6385651080"
                  />  
            </Content>
        </Container>
    </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
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
    title: {
        fontSize: (( Dimensions.get('window').height) * 0.024), 
        position: 'absolute',
        top: '-18%',
        left: '26%'
    },
    dp: {
        height: 100,
        borderRadius: 50,
        width: 100,
        alignSelf: 'center',
        marginTop: '8%',
        marginBottom: '8%',
    },
      col: {
          width: '50%',
          alignSelf: 'center',
          height: '10%',
          position: 'relative'
      },
      grid: {
          alignSelf: 'center'
      },
      img: {
          marginTop: '6%',
          width: 80,
          height: 80,
          resizeMode: 'cover',
          alignSelf: 'center'

      },
      info: {
        alignSelf: 'center', marginTop: '2%',
        color: '#000'
      },
      banner: {
        opacity: 0,
        position: 'absolute',
        bottom: -200
    }
      
})