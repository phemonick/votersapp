import React, { Component } from 'react';
import {StyleProvider, Container, Header, Content, Left, Body, Title } from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux'
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'


export default class Home extends Component {
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
            <Image source={require('../img/location.jpg')} style={styles.dp}/>
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
                    <TouchableOpacity onPress={()=> Actions.manifest()} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-16.png')} />
                        <Text style = {styles.info} > Add Manifest</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Actions.issues()} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-17.png')} />
                        <Text style = {styles.info} > National Issues </Text>
                    </TouchableOpacity> 
                </Grid>
                <Grid style={styles.grid}>
                    <TouchableOpacity onPress={()=> Actions.chat()} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-18.png')} />
                        <Text style = {styles.info} > Chat with Atiku </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Actions.rate()} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-19.png')} />
                        <Text style = {styles.info} > Rate Atiku </Text>
                    </TouchableOpacity> 
                </Grid>
                <Grid style={styles.grid}>
                    <TouchableOpacity onPress={()=> Actions.opportunity()} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-20.png')} />
                        <Text style = {styles.info} > Opportunity Center </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Actions.pvc()} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-21.png')} />
                        <Text style = {styles.info} > Getting Your PVC </Text>
                    </TouchableOpacity> 
                </Grid>
                <Grid style={styles.grid}>
                    <TouchableOpacity onPress={()=> Actions.campaign()} style= {{backgroundColor: '#ddd', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-25.png')} />
                        <Text style = {styles.info} > Join the Atiku Campaign </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> Actions.refer()} style= {{backgroundColor: '#eee', height: 160, width: '42%'}} >
                        <Image style={styles.img}source = {require('../img/icons-09.png')} />
                        <Text style = {styles.info} > Refer a friend to </Text>
                        <Text style = {styles.info} > get Recharge card </Text>
                    </TouchableOpacity> 
                </Grid>
                   
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
        alignSelf: 'center', marginTop: '2%'
      }
      
})