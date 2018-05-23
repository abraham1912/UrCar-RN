/*
   告警
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
    Platform,
    TouchableWithoutFeedback,
    ListView,
    ActionSheetIOS
} from 'react-native';

 import {styles} from './MyStyles'
import './constants' ;
import BaseServiceApiNet from '../utils/BaseServiceApiNet';
var GiftedListView = require('react-native-gifted-listview');


 class Alarm extends Component{
     static navigationOptions = {
         header :null , //隐藏导航栏
     };

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            searcher : '',
            dataSource: ds ,
            cityName : global.constants.cityName,
            cityCode : global.constants.cityCode,
            operatorType : ""
        }
        this._onUserNameChange = this._onUserNameChange.bind(this);
    }

    componentDidMount(){
        var from = this.props.navigation.state.params.from ;
        var mFrom = ''
        if ("整备"===from){
            mFrom = global.constants.ZHENG_BEI;
        }else if ("调度"===from){
            mFrom = global.constants.DISPATCH;
        }if ("充电"===from){
            mFrom = global.constants.CHARGE;
        }if ("故障"===from){
            mFrom = global.constants.GU_ZHANG;
        }if ("维修"===from){
            mFrom = global.constants.REPAIR;
        }if ("事故"===from){
            mFrom = global.constants.Accident;
        }if ("告警"===from){
            mFrom = global.constants.ALARM;
        }
        this.setState({operatorType:mFrom});
        fetchData(this,mFrom)
    }
     _onUserNameChange(inputData){
         this.setState({searcher:inputData});
         fetchData(this,this.state.operatorType)
     }

    render() {
        const { goBack } = this.props.navigation;
        const { navigate } = this.props.navigation;
        return (
            <View style={[styles.container,{marginTop:10}]}>
                <View style={styles.containerRowNavagation}>
                    <TouchableWithoutFeedback onPress={()=>goBack()}>
                        <Image source={require("../img/back.png")} style={styles.backImage}/>
                    </TouchableWithoutFeedback>
                    <View style={{backgroundColor:'#c9c9c9',height:35,flexDirection:'row',
                        alignItems:'center',width:global.constants.deviceWidth-120,marginLeft:10}}>
                        <Image source={require("../img/search.png")} style={{height:20,width:20,marginLeft:15}}/>
                        <TextInput style={{flex:1,color:'#666666',fontSize:16,alignItems:'center',
                            marginLeft:10}} maxLength = {9}
                                   placeholder='请输入网点名称/车牌号'
                                   onChangeText={this._onUserNameChange}></TextInput>
                    </View>
                    <TouchableWithoutFeedback onPress={()=>fetchData(this,this.state.operatorType)}>
                    <Image source={require("../img/refresh.png")} style={{height:25,width:25,marginLeft:40}}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.line}/>
                <TouchableWithoutFeedback onPress={()=>{

                }}>
                    <View style = {styles.lineContainerStyle}>
                        <Text style={[styles.textStyle_left,{fontSize:16}]} onPress={()=>showActionSheet(this)}>选择城市：  {this.state.cityName}</Text>
                        <View style={{flex:1,flexDirection:'row-reverse',alignItems:'center'}}>
                            <TouchableWithoutFeedback onPress={()=>navigate('Location')}>
                            <Image source={require("../img/map_icon.png")} style={{height:25,width:25,marginRight:10}}></Image>
                            </TouchableWithoutFeedback>
                            <View style={[styles.lineVertical,{height:50,marginRight:10}]}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.line}/>
                <View style={[styles.line,{marginTop:10}]}/>
                <ListView
                    style={{width:global.constants.width}}
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderRow={
                        (rowData) =>
                            <TouchableOpacity onPress={()=>{
                                Alert.alert('标题内容','正文内容',
                                    [{text:"我知道了", onPress:this.confirm}]
                                );
                            }}>
                                <View>
                                <View style={{backgroundColor:'#ffffff',justifyContent:'center',paddingBottom:5,paddingTop:5}}>
                                    <Text style={{
                                        marginLeft:10,marginRight:10,font:16,color:'#666666'}}>
                                        {rowData.areaName+"   \n经理："+rowData.managerName+"   主管："+
                                        rowData.directorName+"   数量："+rowData.total}
                                    </Text>
                                    <Text style={{
                                        marginLeft:10,marginRight:10,font:16,color:'#666666'}}>
                                        {
                                            getTextValue(rowData)
                                        }
                                    </Text>

                                </View>
                                    <View style={styles.line}/>
                                </View>
                            </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

function fetchData(context,from){
    let params = {pageNo:'1' ,
        cityCode:context.state.cityCode,
        workOrderType : from,
        searcher : context.state.searcher
    }
    let ret = null
    if(from=== global.constants.ALARM){  //告警
        ret = BaseServiceApiNet.queryAreaAlarm(params)
         }else if (from=== global.constants.ZHENG_BEI){
        ret =BaseServiceApiNet.getSetupByAre(params)
      }else if (from=== global.constants.DISPATCH){
        ret =BaseServiceApiNet.queryAreaDispatchInfos(params)
    }else if (from=== global.constants.CHARGE){
        ret =BaseServiceApiNet.queryAreaChargeWorkOrderCount(params)
    }else if (from=== global.constants.GU_ZHANG){
        ret =BaseServiceApiNet.queryAreaVehicleFault(params)
    }else if (from=== global.constants.REPAIR){
        ret =BaseServiceApiNet.getRepairByAreas(params)
    }else if (from=== global.constants.Accident){
        ret =BaseServiceApiNet.getAccidentAreas(params)
    }else{    //车辆控制
        ret =BaseServiceApiNet.queryAreaInfoByCityCode(params)
    }
    ret.then((responseJson) => {
        let mContent = responseJson.content.records
        context.setState({
            dataSource: context.state.dataSource.cloneWithRows(mContent),
        });
        console.log(JSON.stringify(mContent))
        return responseJson;
    })
        .catch((error) => {
            console.error(error);
        });
}

function getTextValue(rowData) {
    var i ;
    var mText = ""
     if(rowData.status != "undefined" && rowData.status !=null){
         for (i=0;i<rowData.status.length;i++){
             mText+=rowData.status[i].key+" : "+rowData.status[i].value+"    "
         }

     }else if(rowData.vehicleKindsCount != "undefined" && rowData.vehicleKindsCount != null){
         for (i=0;i<rowData.vehicleKindsCount.length;i++){
             mText+=rowData.vehicleKindsCount[i].CODE_NAME+" : "+rowData.vehicleKindsCount[i].SUM+"    "
         }
     }
    return mText ;
}

function showActionSheet(context) {
    let BUTTONS =[];
    var i ;
    for(i=0;i<global.constants.citys.length;i++){
        BUTTONS[i] =  global.constants.citys[i].cityName
    }
    BUTTONS[global.constants.citys.length] = '取消'
    ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: global.constants.citys.length,
        },
        (buttonIndex) => {
            if(buttonIndex!=global.constants.citys.length){
                context.setState({cityName:BUTTONS[buttonIndex],
                    cityCode : global.constants.citys[buttonIndex].cityCode
                })
                fetchData(context,context.state.operatorType)
            }
        })
}

export default Alarm ;