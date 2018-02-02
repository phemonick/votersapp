import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler,
  StatusBar
} from 'react-native';
import { StyleProvider, Left, Button, Header, Title } from 'native-base';
import { Router, Scene, Drawer, Stack } from 'react-native-router-flux'
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import Manifest from './src/components/Manifest'
import Issues from './src/components/Issues'
import Opportunity from './src/components/Opportunity'
import Rate from './src/components/Rate'
import Login from './src/components/Login'
import Verify from './src/components/Verify'
import Pvc from './src/components/Pvc'
import Home from './src/components/Home'
import DrawerContent from './src/DrawerContent'
import MenuIcon from './src/img/icons-02.png';


export default class App extends Component<{}> {

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
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0)"
          translucent={true}
          />
        <Router titleStyle={{color: '#fff'}} sceneStyle={{backgroundColor: '#fff'}}>
          <Scene key="root">
            <Stack>
              <Scene key="login" component={Login} title="Login" hideNavBar= {true} />
              <Scene key="verify" component={Verify} title="Verify" hideNavBar= {true} />
            </Stack>
          <Drawer
              hideNavBar
              key="drawer"
              contentComponent={DrawerContent}
              drawerWidth={300}
              drawerImage={MenuIcon}
              hideDrawerButton={false}
            >
            <Stack>
              <Scene key="verify" component={Verify} title="Verify" hideNavBar= {true} />
              <Scene key="home" component={Home} title="Home" hideNavBar= {true} />
              <Scene key="manifest" component={Manifest} title="Manifest" hideNavBar= {true} />
              <Scene key="issues" component={Issues} title="Issues" hideNavBar= {true} />
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