import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';


 import './constants' ;
 import BaseServiceApiNet from '../utils/BaseServiceApiNet';

class Login extends Component {
    static navigationOptions = ({navigation}) => ( {
        headerTitle: '登录',
    })

    constructor(props){
        super(props);
        this._onUserNameChange = this._onUserNameChange.bind(this);
        this._onPasswordChange = this._onPasswordChange.bind(this);
        this.state = {userName : '',password : ''}

    }
    _onUserNameChange(inputData){
      this.setState({userName:inputData})
       // alert(inputData)
    }
    _onPasswordChange(inputData){
        this.setState({password:inputData})
    }

    render() {
        const { goBack } = this.props.navigation;
        //const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <View style={{height:0.5, backgroundColor:'#999999',marginTop:10}}/>
                <View style = {styles.lineContainerStyle}>
                    <Image style={{height:30,width:30,marginLeft:10}}
                           source={require("../img/user_name.png")}/>
                    <TextInput style={{flex:1,color:'#666666',fontSize:16}}
                               placeholder='用户名' onChangeText={this._onUserNameChange}></TextInput>
                </View>
                <View style={{height:0.5, backgroundColor:'#999999',marginLeft:15}}/>
                <View style = {styles.lineContainerStyle}>
                    <Image style={{height:30,width:30,marginLeft:10}}
                           source={require("../img/password.png")}/>
                    <TextInput style={{flex:1,color:'#666666',fontSize:16}} secureTextEntry = {true}
                               placeholder='密码' onChangeText={this._onPasswordChange}></TextInput>
                </View>
                <View style={{height:0.5, backgroundColor:'#999999'}} />
                <TouchableOpacity onPress={()=>loginIn(goBack,this.state)}>
                <View style={styles.textStyle}>
                <Text
                    style={{fontSize:18,textAlign:'center', color:'#ffffff'}}>登录</Text>
                </View>
                </TouchableOpacity>
                <Text style={{textAlign:'right',marginTop:10,marginRight:10,color:'#666666'}}>忘记密码请联系管理员</Text>
            </View>
        );
    }
}

function loginIn(goBack,state) {
     if (""==state.userName || ""==state.password){
         Alert.alert("提示","请输入用户名和密码")
         return ;
     }
    let params = {loginId: state.userName, password: state.password}
    BaseServiceApiNet.loginIn(params)
    .then((responseJson) => {
            let mContent = responseJson.content
            global.constants.isLogin = true
            global.constants.userName = mContent.userName
            global.constants.imageUrl = mContent.imageUrl
            global.constants.phone = mContent.userPhone
            goBack();
            return mContent;
        })
        .catch((error) => {
            alert(error)
            console.error(error);
        });
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    lineContainerStyle:{
        height:50,
        flexDirection:'row',
        alignItems:"center",
        backgroundColor : '#ffffff'
    },
    textStyle_left:{
        color : '#666666' ,
        fontSize : 14,
        marginLeft : 10
    },
    imageStyle:{
        height:45 ,
        width:45,
        marginRight:5
    },

    textStyle:{
        alignItems: 'center',backgroundColor:'#ff8903',
        marginTop:50,height:40, justifyContent: 'center',
        marginLeft:10,marginRight:10
    },

});

export default Login ;
