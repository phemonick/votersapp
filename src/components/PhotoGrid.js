import React, { Component } from 'react';
import { AdMobBanner } from 'react-native-admob'
import Grid from 'react-native-photo-grid';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { ActivityIndicator, Image, TouchableOpacity, View, RefreshControl, BackHandler, Dimensions, StyleSheet, Text, Button} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Left, Right, Body, Title, StyleProvider, Container, Header } from 'native-base'



const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    backgroundColor: '#999', 
    marginRight: 1, 
    marginLeft: 1, 
    borderRadius: 3, 
    width: (( Dimensions.get('window').width) * 0.33), 
    height: (( Dimensions.get('window').height) * 0.33)
  },
  banner: {
    opacity: 0,
    position: 'absolute',
    bottom: -200
},
container: {
  backgroundColor: '#FFF'
},
open: {
  width:  (( Dimensions.get('window').height) * 0.025),
  height:  (( Dimensions.get('window').height) * 0.025),
  marginTop: '9%',
  marginLeft: '4%'

},
title: {
  fontSize: (( Dimensions.get('window').height) * 0.024), 
  position: 'absolute',
  top: '-18%',
  left: '31%'
},
})
class PhotoGrid extends Component {
  constructor(props) {
    super(props);
      this.state = { items: [], isLoading: true, refreshing: false, error: false };
      this.baseState = this.state
    }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.fetchPhotos()

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

  fetchPhotos() {
    return fetch('http://api.atikuvotersapp.org/getgallery')
    .then((response) => response.json())
    .then((response) => {
      console.log(response.message)
      if(response.message.length % 3 == 0) {
        this.setState({
          isLoading: false,
          items: response.message
      })
      } else {
        this.setState({
          isLoading: false,
          items: response.message.splice(0, response.message.length - response.message.length % 3)
        })
      }
       
    })
    .catch(error => {
      this.setState({
        isLoading: false,
        error: true
      })
    })
    }
    reset = () => {
      this.setState(this.baseState)
      this.fetchPhotos()
    }
    _onRefresh() {
      this.setState({refreshing: true})
      this.fetchPhotos().then(() => {
        this.setState({
          refreshing: false
        })
      })
    }
  render() {
    const photos = this.state.items
      if (this.state.isLoading) {
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
                        <Title style={styles.title}>PHOTO GALLERY</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => Actions.pop()} activeOpacity = {0.8}>
                            <Image source={require('../img/back.png')} style={styles.open}/>
                        </TouchableOpacity>    
                    </Right>  
                  </Header>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#008841"/>
              </View>
            </Container>
          </StyleProvider>
        );
      }
      else if (this.state.error) {
        return (
          <StyleProvider style={getTheme(material)}>
            <Container style={styles.container}>
                <Header style={{ marginTop: (( Dimensions.get('window').height) * 0.024)}}>
                    <Left>
                        <TouchableOpacity onPress={() => Actions.drawerOpen()}  activeOpacity = {0.8}>
                            <Image source={require('../img/icons-02.png')} style={styles.open}/>
                        </TouchableOpacity>
                    </Left>
                    <Body>
                        <Title style={styles.title}>PHOTO GALLERY</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={() => Actions.pop()} activeOpacity = {0.8}>
                            <Image source={require('../img/back.png')} style={styles.open}/>
                        </TouchableOpacity>    
                    </Right>  
                </Header>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: '#000'}}>Could not Pictures :(</Text>
                  <Text></Text>
                  <Button onPress={() => {this.reset()}} title="RETRY" color='#008841'></Button>
                </View>
              </Container>
            </StyleProvider>
          
        )
      }
 
      return (
        <StyleProvider style={getTheme(material)}>
          <Container style={styles.container}>
              <Header style={{ marginTop: (( Dimensions.get('window').height) * 0.024)}}>
                  <Left>
                      <TouchableOpacity onPress={() => Actions.drawerOpen()}  activeOpacity = {0.8}>
                          <Image source={require('../img/icons-02.png')} style={styles.open}/>
                      </TouchableOpacity>
                  </Left>
                  <Body>
                      <Title style={styles.title}>PHOTO GALLERY</Title>
                  </Body>
                  <Right>
                      <TouchableOpacity onPress={() => Actions.pop()} activeOpacity = {0.8}>
                          <Image source={require('../img/back.png')} style={styles.open}/>
                      </TouchableOpacity>    
                  </Right>  
              </Header>
              <View style={{flex: 1, backgroundColor: '#fff'}}>
                    <Grid
                        data = { this.state.items }
                        itemsPerRow = { 3 }
                        renderItem = { this.renderItem }
                        refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            />
                          }
                        />
                        <AdMobBanner
                          style={styles.banner}
                          adSize="fullBanner"
                          adUnitID="ca-app-pub-6762059104295133/6487243342"
                        />       
              </View>
            </Container>
          </StyleProvider>
      );
    }
    
    renderItem(photos) {
      const goToSingle = (data) =>{ 
        Actions.single({data: photos})
        
      }
      return(
              <TouchableOpacity
                key = {photos.id}
                style={styles.touchable}
                activeOpacity = {0.6}
                onPress={goToSingle}
                >
                  <Image
                    resizeMode = "cover"
                    style = {{ flex: 1 }}
                    source={{uri: photos.name}}
                  />  
              </TouchableOpacity>
      )
    }

  }

  export default PhotoGrid