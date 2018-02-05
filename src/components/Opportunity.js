import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Picker, TouchableOpacity, ToastAndroid } from 'react-native'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

export default class Content extends Component{
    
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
            <View style = {styles.container}> 
                <Text style = {styles.info} > OPPORTUNITY CENTER </Text>
                <View style = {styles.content}> 
                    <View style = {styles.top}> 
                        <View style = {styles.pickJ} >
                        
                            <Image style = {styles.Jimg1} source = {require('../img/icons-13.png')} />
                            
                            <View style = {styles.jImg}>
                                <Picker
                                    mode={'dropdown'}
                                    selectedValue={this.state.jobs}
                                    onValueChange={(itemValue, itemIndex) => this.setState({jobs: itemValue})}>
                                    <Picker.Item  label="Jobs For Nigerians" value="java" />
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
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
                            <TouchableOpacity style={styles.submitCv}>
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
                            <TouchableOpacity style={styles.submitCv}>
                                <Text style={styles.submitCvT}> Submit Idea </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: 20
    },
    info: {
        fontSize: 24,
        color: '#27ae60',
        marginBottom: 10
        
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
            padding: 10,
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
})