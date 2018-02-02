import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { Container, Content, List, ListItem } from 'native-base';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008841',
    borderWidth: 2,
    borderColor: '#008841',
    paddingTop: '4%'
  },
  link: {
    color: '#fff',
    fontSize: (( Dimensions.get('window').height) * 0.02),

  },
  close: {
    width:  (( Dimensions.get('window').height) * 0.018),
    height:  (( Dimensions.get('window').height) * 0.018),
    marginLeft: '92%',
    marginTop: (( Dimensions.get('window').height) * 0.024)
    
  },
  logo: {
    width:  (( Dimensions.get('window').height) * 0.2),
    height:  (( Dimensions.get('window').height) * 0.2),
    marginLeft: '24%'
  },
  version: {
    color: '#fff',
    textAlign: 'center',
    marginTop: '1%'
  }
});

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <TouchableOpacity onPress={() => Actions.drawerClose()}  activeOpacity = {0.8}>
          <Image source={require('./img/icons-03.png')} style={styles.close}/>
          </TouchableOpacity>
          <Content>
            <Image source={require('./img/icons-24.png')} style={styles.logo}/>
            <Text style={styles.version}>V.1.0</Text>
            <List>
              <ListItem>
                <Text style={styles.link}>About Voters App</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.link}>Support</Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      </View >
    );
  }
}

export default DrawerContent;