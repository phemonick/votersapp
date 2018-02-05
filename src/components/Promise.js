import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
  Image
} from 'react-native';
import { StyleProvider, Container, Header, Left, Body, Title, Content } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

export default class Promise extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: false,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,
  };

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
                <Title style={{fontSize: (( Dimensions.get('window').height) * 0.024)}}>ATIKU'S VOTERS APP</Title>
              </Body>  
          </Header>
          <Text style={styles.topic} > THE PROMISE </Text>
      <ScrollView
        style={styles.container}
        onLayout={({ nativeEvent: { layout: { width } } }) => {
          if (!this.state.containerMounted) this.setState({ containerMounted: true });
          if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
        }}
      >
        {this.state.containerMounted && (
          <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            // You must have an API Key for the player to load in Android
            apiKey="AIzaSyCZNRFr_mF53iI6wLcznjXHjA4KWrQ4eXM"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            //videoId="ncw4ISEU5ik"
            // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            playlistId="PLMyJSIeLVjyGiMX9priixIz3wX9JQxjbN"
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              { height: PixelRatio.roundToNearestPixel(this.state.containerWidth / (16 / 9)) },
              styles.player,
            ]}
            onError={e => this.setState({ error: e.error })}
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onChangeFullscreen={e => this.setState({ fullscreen: e.isFullscreen })}
            onProgress={e => this.setState({ duration: e.duration, currentTime: e.currentTime })}
          />
        )}
    
        {/* Previous / Next video */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.previousVideo()}
          >
            <Text style={styles.buttonText}>Previous Video</Text>
          </TouchableOpacity>
          <Text style={styles.slash}> | </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this._youTubeRef && this._youTubeRef.nextVideo()}
          >
            <Text style={styles.buttonText}>Next Video</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.details}>
          <Text style={styles.text}>ATIKU ABUBAKAR</Text>
          <Text style={styles.text2}>Atiku Abubakar is a Nigerian Politician, Business man and Philantropist, who served
          as the second elected Vice-President of Nigeria from 1999 to 2007, on the platform of the People's Democratic Party,
          with President Olusegun Obasanjo
          
          </Text>

        </View>
      </ScrollView>
      </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#008841',
  },
  open: {
    width:  (( Dimensions.get('window').height) * 0.025),
    height:  (( Dimensions.get('window').height) * 0.025),
    marginTop: '9%',
    marginLeft: '4%'

},
topic: {
  color: '#FFF',
  fontSize: (( Dimensions.get('window').height) * 0.025),
  marginTop: '5%',
  marginBottom: '5%',
  alignSelf: 'center' 
},
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  slash: {
    fontSize: 18,
    color: '#fff',
    marginTop: '1%'
  },
  details: {
    marginTop: '16%',
    width: '80%',
    alignSelf: 'center'
  },
  text: {
    color: '#FFF',
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: '6%'
  },
  text2: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center'

  }

});
