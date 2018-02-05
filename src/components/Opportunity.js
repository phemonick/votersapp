import React, { Component } from 'react';
import { AdMobBanner } from 'react-native-admob'
import { StyleProvider, Container, Header, Left, Body, Title,  Content } from 'native-base'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { View, Text, StyleSheet, Image, Picker, TouchableOpacity, ToastAndroid, Dimensions } from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { Actions } from 'react-native-router-flux'

export default class Opportunity extends Component{
    
    constructor(){
        super()
        this.state = {
            jobs: '',
            choosen: false,
            choosenb: false,
            filePath: ''
        }
    }
    
    pickFIle(){
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
          },(error,res) => {
            // Android
            if(error){
                console.log(error)
                this.setState({
                    choosen: false
                })
                return null
            }
            ToastAndroid.show(
                'File has been selected',
                ToastAndroid.SHORT,
                
              );
              const split = res.uri.split('/');
            const name = split.pop();
            const inbox = split.pop();
              this.setState({
                choosen: true,
                filePath: res.uri
            })
              
            console.log(
               res.uri,
               res.type, // mime type
               res.fileName,
               res.fileSize
            );
            console.log({split: split, name: name, inbox: inbox})
          });
     
    }
    pickFIle2(){
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
          },(error,res) => {
            // Android
            if(error){
                console.log(error)
                this.setState({
                    choosenb: false
                })
                return null
            }
            ToastAndroid.show(
                'File has been selected',
                ToastAndroid.SHORT,
                
              );
              const split = res.uri.split('/');
            const name = split.pop();
            const inbox = split.pop();
              this.setState({
                choosenb: true,
                filePath: res.uri
            })
              
            console.log(
               res.uri,
               res.type, // mime type
               res.fileName,
               res.fileSize
            );
            console.log({split: split, name: name, inbox: inbox})
          });
     
    }

    render(){

        return(
            <StyleProvider style={getTheme(material)}>
                <Container>
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
                            <View style = {styles.container}> 
                                <Text style = {styles.info} > OPPORTUNITY CENTER </Text>
                                <View style = {styles.content}> 
                                    <View style = {styles.top}> 
                                        <View style = {styles.pickJ} >
                                        
                                            <Image style = {styles.Jimg1} source = {require('../img/icons-13.png')} />
                                            
                                            <View style = {styles.jImg}>
                                            <Text style ={styles.text} > Jobs For Nigerians </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.partb} > 
                                                <View style = {styles.cv}> 
                                                    <Text style = {styles.cvT} > Submit Your CV</Text>
                                                </View>
                                            
                                            <View style={styles.file} >
                                                <Text> File :</Text>
                                                <TouchableOpacity style = {styles.chooseF} onPress={this.pickFIle.bind(this)} >
                                                    <Text> Choose File  </Text>
                                                </TouchableOpacity>
                                                <Text> {this.state.choosen? 'file selected': 'No file selected'} </Text>
                                            </View>
                                            <TouchableOpacity style={styles.submitCv} onPress={() => {
                                                ToastAndroid.show('Submitted', ToastAndroid.SHORT)
                                                Actions.home()
                                            }}>
                                                <Text style={styles.submitCvT}> Submit CV </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style = {styles.bottom}> 
                                        <View style = {styles.bottomA} > 
                                            <Image style = {styles.Jimg1} source = {require('../img/icons-14.png')} />
                                            <View>
                                                <Text style ={styles.text} > Business Capital For </Text>
                                                <Text style ={styles.text} >  Nigerians </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.bottomB}>
                                            <Text> Submit Your Idea </Text>
                                            <View style={styles.file} >
                                                <Text> File : </Text>
                                                <TouchableOpacity style = {styles.chooseF} onPress={this.pickFIle2.bind(this)} >
                                                    <Text> Choose File  </Text>
                                                </TouchableOpacity>
                                                <Text>  {this.state.choosenb? 'file selected': 'No file selected'}  </Text>
                                            </View>
                                            <TouchableOpacity style={styles.submitCv} onPress={() => {
                                                ToastAndroid.show('Submitted', ToastAndroid.SHORT)
                                                Actions.home()
                                            }}>t
                                                <Text style={styles.submitCvT}> Submit Idea </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                                <AdMobBanner
                                    style={styles.banner}
                                    adSize="fullBanner"
                                    adUnitID="ca-app-pub-6762059104295133/6487243342"
                                />
                            </View>
            </Container>
            </StyleProvider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: '6%',
        display: 'flex',
        alignItems: 'center',
        padding: 20
    },
    info: {
        fontSize: 18,
        color: '#27ae60',
        marginBottom: 10
        
    },
    open: {
        width:  (( Dimensions.get('window').height) * 0.025),
        height:  (( Dimensions.get('window').height) * 0.025),
        marginTop: '9%',
        marginLeft: '4%'

    },
    content:{
        height: 80+ '%',
        width: 100+ '%'

    },
    top: {
        backgroundColor: '#ecf0f1',
         height: 60+ '%',
        width: 100+ '%'
    },
        pickJ: {
            display: 'flex',
            flexDirection: 'row',
            height: 30+ '%',
            
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#fff'

        },
        partb: {
            display: 'flex',
            alignItems: 'center',
            height: 70+ '%',
            justifyContent: 'center'
        },
        Jimg1: {
        resizeMode: 'contain',
        height: 60
        },
        jImg: {
            // backgroundColor: '#fff',
            width: 60+ '%'
        },
        cv: {
            display: 'flex',
            alignItems: 'center'
        },
        cvT: {
            textAlign: 'center',
            fontSize: 18
        },
        file: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10


        },
        chooseF: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#C8E6C9',
            padding: 5,
            marginRight: 10,
            marginLeft: 10
        },
        submitCv: {
            margin: 10,
            backgroundColor: '#008841',
            width: 90+'%',
            borderRadius: 10
        },
        submitCvT: {
            textAlign: 'center',
            fontSize: 18,
            padding: 15,
            color: '#fff'
        },
    bottom: {
        marginTop: 20,
        backgroundColor: '#ecf0f1',
        display: 'flex',
        
        
    },
    bottomA: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        height: 30+ '%',
        borderBottomColor: '#fff'
        
        
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    bottomB: {
        display: 'flex',
        alignItems: 'center',

    },
    banner: {
        opacity: 0,
        position: 'absolute',
        bottom: -200
    }
})