/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet, Text,View, Image,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
} from 'react-native';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import SplashScreen from 'react-native-splash-screen'

import './constants' ;
import BaseServiceApiNet from '../utils/BaseServiceApiNet';

import {
    StackNavigator,
} from 'react-navigation';

import My from './My' ;
import UserInfo from './UserInfo' ;
import Login from './Login' ;
import Report from './Report' ;
import OperatorList from './OperatorList' ;
import Location from './Location' ;
import Alarm from './Alarm';

import {Geolocation} from "react-native-baidu-map";



export class HomeScreen extends Component {

    static navigationOptions = {
        //title: '首页',
        header :null , //隐藏导航栏
    };
    constructor(props){
        super(props);
        this.state = {isLogin : global.constants.isLogin}
        global.constants.deviceHeight = Dimensions.get('window').height
        global.constants.deviceWidth = Dimensions.get('window').width
        global.constants.paltform = Platform.OS
    }

    componentDidMount(){
        startLocation();
        getUserToken();
        //sleep(2000); //暂停2秒
        SplashScreen.hide();
        getCitysFromLocal();
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.container_left}>

                    <TouchableWithoutFeedback onPress={()=>navigate('My')} style={ styles.left2}>
                                <View style={ styles.left1}>
                                    <Image style={styles.imageSize}
                                           source={require("../img/jingxuan.png")}></Image>
                                    <Text style={{fontSize:15,color:'#ffffff'}}>精选车辆</Text>
                                </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>navigate('My')} style={ styles.left2}>
                        <View style={ styles.left2}>
                            <Image style={styles.imageSize }
                                   source={require("../img/walk_car.png")}></Image>
                            <Text style={styles.textStyle}>更换代步车</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>navigate('My')} style={ styles.left2}>
                        <View style={ styles.left2}>
                            <Image style={styles.imageSize }
                                   source={require("../img/task.png")}></Image>
                            <Text style={styles.textStyle}>我的任务</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>nextPage(navigate,false,'Location')} style={ styles.left2}>
                        <View style={ styles.left2}>
                            <Image style={styles.imageSize }
                                   source={require("../img/monitor.png")}></Image>
                            <Text style={styles.textStyle}>位置</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>navigate('My')} style={ styles.left2}>
                        <View style={ styles.left2}>
                            <Image style={styles.imageSize }
                                   source={require("../img/authentication.png")}></Image>
                            <Text style={styles.textStyle}>实名认证</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>nextPage(navigate,false,'My')} style={ styles.left2}>
                        <View style={ styles.left2}>
                            <Image style={styles.imageSize }
                                   source={require("../img/my_info.png")}></Image>
                            <Text style={styles.textStyle}>我的</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.container_right}>
                    <TouchableWithoutFeedback onPress={()=>nextPage(navigate,false,'OperatorList','','车辆运营')} style={ styles.left2}>
                        <View style={ styles.left2}>
                            <Image style={styles.imageSize }
                                   source={require("../img/operate.png")}></Image>
                            <Text style={styles.textStyle}>运营</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>nextPage(navigate,false,'OperatorList','','维保')} style={ styles.left2}>
                        <View style={ styles.left2}>
                            <Image style={styles.imageSize }
                                   source={require("../img/safe_icon.png")}></Image>
                            <Text style={styles.textStyle}>维保</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>nextPage(navigate,true,'Alarm',"etmmp.queryVehicle","车辆控制")} style={ styles.left2}>
                        <View style={ styles.left2}>
                            <Image style={styles.imageSize }
                                   source={require("../img/vehicle_control.png")}></Image>
                            <Text style={styles.textStyle}>车辆控制</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>nextPage(navigate,false,'Alarm',"","告警")} style={ styles.left2}>
                        <View style={ styles.left1}>
                            <Image style={styles.imageSize}
                                   source={require("../img/alarm.png")}></Image>
                            <Text style={{fontSize:15,color:'#ffffff'}}>告警</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=>nextPage(navigate,true,"Report","urcar.getTimeStaticCompany")} style={ styles.left2}>
                        <View style={ styles.left2}>
                            <Image style={styles.imageSize }
                                   source={require("../img/report.png")}></Image>
                            <Text style={styles.textStyle}>报表</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

function getUserToken() {
    global.constants.storage.load({
        key: 'loginState',
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: false,
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
        syncInBackground: false,
    }).then(ret => {
        //console.log("getUserToken==="+ret.token)
        global.constants.userToken = ret.token ;
        getCitys();
        getUserInfo();
    }).catch(err => {
        global.constants.userToken = "";
        getCitys();
        getUserInfo();
    })
}

function nextPage(navigate,isNeadPermission,page,permission,from) {
    if(global.constants.isLogin){
        if(isNeadPermission){
            let params  = {permission : permission}
            BaseServiceApiNet.queryPermission(params)
                .then((responseJson) => {
                    navigate(page,{from:from})
                    return responseJson;
                })
                .catch((error) => {
                    console.error(error);
                });
        }else {
            navigate(page,{from:from})
        }

    } else{
        navigate("Login")
    }
}

function getCitys() {
    let params  = {cityCode : global.constants.cityCode}
    BaseServiceApiNet.getCitys(params)
        .then((responseJson) => {
            global.constants.storage.save({
                key: 'city',  // 注意:请不要在key中使用_下划线符号!
                data: {
                    citys: responseJson.content
                },
                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: null
            });
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
}

function getUserInfo() {
    let params  = {ID : new Date().getTime()}
    BaseServiceApiNet.getUserInfo(params)
        .then((responseJson) => {
            if (typeof responseJson==="undefined"){  //未登录
                global.constants.isLogin = false;
                return false;
            }else{
                let mContent = responseJson.content
                global.constants.isLogin = true
                global.constants.userName = mContent.userName
                global.constants.phone = mContent.userPhone
                global.constants.imageUrl = mContent.imageUrl
                return true;
            }
        })
        .catch((error) => {
            console.error(error);
        });

}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function startLocation() {
    Geolocation.getCurrentPosition()
        .then(data => {
            /**
             * {"address":"北京市朝阳区广顺北大街","city":"北京市",
             * "district":"朝阳区","longitude":116.486303,"cityCode":"131",
             * "streetName":"广顺北大街","latitude":40.018894,"streetNumber":"","province":"北京市"}
             */
            global.constants.defaultCenter.latitude = data.latitude
            global.constants.defaultCenter.longitude = data.longitude
            global.constants.cityName = data.city
        })
        .catch(e =>{
            console.warn(e, 'error');
        })
}

function getCitysFromLocal() {
    global.constants.storage.load({     //初始化城市
        key: 'city',
        // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        autoSync: false,
        // syncInBackground(默认为true)意味着如果数据过期，
        // 在调用sync方法的同时先返回已经过期的数据。
        // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
        syncInBackground: false,
    }).then(ret => {
        global.constants.citys = ret.citys
        var i ;
        for(i=0;i<ret.citys.length;i++){
            if (global.constants.cityName.includes(ret.citys[i].cityName)){
                global.constants.cityCode = ret.citys[i].cityCode
                global.constants.cityName = ret.citys[i].cityName
                break ;
            }
        }
        return ret;
    }).catch(err => {
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'row' ,
        marginLeft : 5,
        marginRight:5 ,
        marginBottom :5,
        marginTop:13,
        backgroundColor: '#ffffff',
    },
    container_left: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginRight:5
    },
    container_right: {
        flex: 1,
        backgroundColor: '#ffffff',

    },
    left1: {
        flex: 1,
        backgroundColor: '#ff8903',
        marginTop:5 ,
        justifyContent:'center' ,
        alignItems:'center'
    },
    left2: {
        flex:1,
        backgroundColor: '#eeeeee',
        marginTop:5 ,
        justifyContent:'center' ,
        alignItems:'center',
    },
    right: {
        flex: 5,
        backgroundColor: '#ffffff',
    },
    imageSize :{
        height:50,
        width:40
    },

    textStyle:{
        color : '#ff8903' ,
        fontSize:15 ,
    },

});

const MyApp = StackNavigator({
        //key（App）代表页面的文件名  value（Page1）代表导入的组件名称 import
        App: { screen: HomeScreen },
        My: { screen: My },
        UserInfo: { screen: UserInfo },
        Login : {screen:Login},
        Report: {screen : Report},
        OperatorList: {screen : OperatorList},
        Location: {screen : Location},
        Alarm: {screen : Alarm},

    },{
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        }),

        navigationOptions: ({ navigation }) => ({
            headerBackTitle: null ,
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
        }),

    }
);

export default MyApp ;