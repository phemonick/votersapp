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
} from 'react-native'
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

export default class RCTYouTubeExample extends React.Component {
    state = {
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true,
      isLooping: true,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      containerMounted: false,
      containerWidth: null,
    };
    render() {
        return (
          <ScrollView
            style={styles.container}
            onLayout={({ nativeEvent: { layout: { width } } }) => {
              if (!this.state.containerMounted) this.setState({ containerMounted: true });
              if (this.state.containerWidth !== width) this.setState({ containerWidth: width });
            }}
          >
            <Text style={styles.welcome}>{'<YouTube /> component for\n React Native.'}</Text>
            <Text style={styles.instructions}>
              http://github.com/inProgress-team/react-native-youtube
            </Text>
    
            {this.state.containerMounted && (
              <YouTube
                ref={component => {
                  this._youTubeRef = component;
                }}
                // You must have an API Key for the player to load in Android
                apiKey="YOUR_API_KEY"
                // Un-comment one of videoId / videoIds / playlist.
                // You can also edit these props while Hot-Loading in development mode to see how
                // it affects the loaded native module
                videoId="ncw4ISEU5ik"
                // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
                // playlistId="PLF797E961509B4EB5"
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
            </ScrollView>
}
}