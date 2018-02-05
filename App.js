import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler,
  StatusBar,
  Dimensions
} from 'react-native';
import { StyleProvider, Left, Button, Header, Title } from 'native-base';
import { Router, Scene, Drawer, Stack } from 'react-native-router-flux'
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import Manifest from './src/components/Manifest'
import Issues from './src/components/Issues'
import Opportunity from './src/components/Opportunity'
import Rate from './src/components/Rate'
import Refer from './src/components/Refer'
import Login from './src/components/Login'
import Olduser from './src/components/Olduser'
import Promise from './src/components/Promise'
import Campaign from './src/components/Campaign'
import Guide from './src/components/Guide'
import Verify from './src/components/Verify'
import Loader from './src/components/Loader'
import Pvc from './src/components/Pvc'
import Home from './src/components/Home'
import DrawerContent from './src/DrawerContent'
import OneSignal from 'react-native-onesignal'
import MenuIcon from './src/img/icons-02.png';


export default class App extends Component<{}> {

  componentDidMount () {
    OneSignal.configure({})
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress () {
   BackHandler.exitApp()
  }
  
  render() {
    const width = (Dimensions.get('window').height / 3)
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0)"
          translucent={true}
          />
        <Router titleStyle={{color: '#fff'}} sceneStyle={{backgroundColor: '#fff'}}>
          <Scene key="root">
            <Stack>
              <Scene key="loader" component={Loader} title="Loader" hideNavBar= {true} />
              <Scene key="login" component={Login} title="Login" hideNavBar= {true} />
              <Scene key="verify" component={Verify} title="Verify" hideNavBar= {true} />
            </Stack>
          <Drawer
              hideNavBar
              key="drawer"
              contentComponent={DrawerContent}
              drawerWidth={width}
              drawerImage={MenuIcon}
              hideDrawerButton={false}
            >
            <Stack>
              <Scene key="verify" component={Verify} title="Verify" hideNavBar= {true} />
              <Scene key="olduser" component={Olduser} title="Olduser" hideNavBar= {true} />
              <Scene key="promise" component={Promise} title="Promise" hideNavBar= {true} />
              <Scene key="home" component={Home} title="Home" hideNavBar= {true} />
              <Scene key="campaign" component={Campaign} title="Campaign" hideNavBar= {true} />
              <Scene key="manifest" component={Manifest} title="Manifest" hideNavBar= {true} />
              <Scene key="guide" component={Guide} title="Guide" hideNavBar= {true} />
              <Scene key="issues" component={Issues} title="Issues" hideNavBar= {true} />
              <Scene key="refer" component={Refer} title="Refer" hideNavBar= {true} />
              <Scene key="rate" component={Rate} title="Rate" hideNavBar= {true} />
              <Scene key="pvc" component={Pvc} title="Pvc" hideNavBar= {true} />
              <Scene key="opportunity" component={Opportunity} title="Opportunity" hideNavBar= {true} />
            </Stack>
            </Drawer>

          </Scene>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
