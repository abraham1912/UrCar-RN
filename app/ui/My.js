import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableWithoutFeedback,
    Switch,
} from 'react-native';

import './constants' ;
import BaseServiceApiNet from "../utils/BaseServiceApiNet";


//1：获取当前屏幕的宽度、高度、分辨率

class My extends Component {
    static navigationOptions = ({navigation}) => ( {
        headerTitle: '我的',
        headerBackTitle: null,
        headerLeft: (
            <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>
                <Image source={require("../img/back.png")} style={{height:30,width:30}}/>
            </TouchableWithoutFeedback>
        ),
        headerTitleStyle:{
            textAlign: 'center',
            flexGrow: 1
        },
        headerRight:<View />  //那种有返回按钮的页面中，会导致title整体向右偏移，所有在右侧设置一个View，来让title居中
       // headerStyle: {elevation: 0}
    })

    constructor(props){
        super(props);
        this.state = {switchValue : false};

    }
    componentDidMount(){

    }


    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{height:0.5, backgroundColor:'#999999',marginTop:10}}/>
                <TouchableWithoutFeedback onPress={()=>navigate("UserInfo")}>
                <View style = {{height:60,flexDirection:'row',alignItems:"center",backgroundColor:'#ffffff'}}>
                 <Image style={{height:45 ,width:45,marginLeft:15}}
                        source={global.constants.imageUrl === ""?require("../img/default_avatar.png"):{uri:global.constants.imageUrl}}/>
                    <View style={{justifyContent:"center",marginLeft:10}}>
                        <Text style={[styles.textStyle,{fontSize:16}]}>{global.constants.userName}</Text>
                        <Text style={{marginTop:5,color : '#666666' , fontSize : 14}}>{global.constants.phone}</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <View style={{height:0.5, backgroundColor:'#999999'}}/>

                <View style={{height:0.5, backgroundColor:'#999999',marginTop:10}}/>
                <TouchableWithoutFeedback onPress={()=>this.setState({switchValue: !this.state.switchValue})}>
                <View style = {styles.lineContainerStyle}>
                    <Image style={{height:25 ,width:25,marginLeft:15}}
                           source={require("../img/sign_on.png")}/>
                    <Text style={styles.textStyle_left}>签到</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Switch value={this.state.switchValue}></Switch>
                    </View>

                </View>
                </TouchableWithoutFeedback>
                <View style={styles.lineStyle}/>

                <TouchableWithoutFeedback onPress={()=>alert("1111111")}>
                <View style = {styles.lineContainerStyle}>
                    <Image style={styles.imageStyle}
                           source={require("../img/my_work.png")}/>
                    <Text style={styles.textStyle_left}>我的工作</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Image source={require("../img/arr_right.png")} style={{height:25,width:25}}></Image>
                    </View>
                </View>
                </TouchableWithoutFeedback>

                <View style={styles.lineStyle}/>
                <TouchableWithoutFeedback onPress={()=>alert("1111111")}>
                <View style = {styles.lineContainerStyle}>
                    <Image style={styles.imageStyle}
                           source={require("../img/work_schedule.png")}/>
                    <Text style={styles.textStyle_left}>排班表</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Image source={require("../img/arr_right.png")} style={{height:25,width:25}}></Image>
                    </View>
                </View>
                </TouchableWithoutFeedback>

                <View style={styles.lineStyle}/>
                <TouchableWithoutFeedback onPress={()=>alert("1111111")}>
                <View style = {styles.lineContainerStyle}>
                    <Image style={styles.imageStyle}
                           source={require("../img/message.png")}/>
                    <Text style={styles.textStyle_left}>系统消息</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Image source={require("../img/arr_right.png")} style={{height:25,width:25}}></Image>
                    </View>
                </View>
                </TouchableWithoutFeedback>

                <View style={styles.lineStyle}/>
                <TouchableWithoutFeedback onPress={()=>alert("1111111")}>
                <View style = {styles.lineContainerStyle}>
                    <Image style={styles.imageStyle}
                           source={require("../img/modify_password.png")}/>
                    <Text style={styles.textStyle_left}>修改密码</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Image source={require("../img/arr_right.png")} style={{height:25,width:25}}></Image>
                    </View>
                </View>
                </TouchableWithoutFeedback>

                <View style={styles.lineStyle}/>
                <TouchableWithoutFeedback onPress={()=>alert("1111111")}>
                <View style = {styles.lineContainerStyle}>
                    <Image style={styles.imageStyle}
                           source={require("../img/change_city.png")}/>
                    <Text style={styles.textStyle_left}>二维码</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Image source={require("../img/arr_right.png")} style={{height:25,width:25}}></Image>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <View style={styles.lineStyle}/>
                <TouchableWithoutFeedback onPress={()=>loginOut(goBack)}>
                <View style = {styles.lineContainerStyle}>
                    <Image style={styles.imageStyle}
                           source={require("../img/change_city.png")}/>
                    <Text style={styles.textStyle_left}>退出</Text>
                    <View style={{flex:1,alignItems:'flex-end'}}>
                        <Image source={require("../img/arr_right.png")} style={{height:25,width:25}}></Image>
                    </View>
            </View>
                </TouchableWithoutFeedback>
                <View style={styles.lineStyle}/>
            </View>
        );
    }
}

function loginOut(goBack) {
    let params = {date :new Date().getTime()}
    BaseServiceApiNet.loginOut(params)
        .then((responseJson) => {
            global.constants.isLogin = false
            global.constants.userName = ""
            global.constants.phone = ""
            global.constants.imageUrl = ""
            goBack();
            return responseJson;
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
    lineStyle:{
        height:0.5,
        backgroundColor:'#999999'
    },
    lineContainerStyle:{
        height:45,
        flexDirection:'row',
        alignItems:"center",
        backgroundColor : '#ffffff'
    },
    imageStyle:{
        height:25 ,
        width:25,
        marginLeft:15
    },
    textStyle :{
        color : '#666666' ,
        fontSize : 14
    },
    textStyle_left:{
        color : '#666666' ,
        fontSize : 14,
        marginLeft : 10
    },
});

export default My ;
