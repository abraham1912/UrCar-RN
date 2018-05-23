import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ListView,
    TouchableOpacity,
    TouchableWithoutFeedback,

} from 'react-native';

import './constants' ;
import BaseServiceApiNet from '../utils/BaseServiceApiNet';
/*
  运营
 */

import People from '../utils/CommonUtil'

class OperatorList extends Component {


        static navigationOptions = ({navigation}) => ( {
        headerTitle:`${navigation.state.params?navigation.state.params.from:''}`,
    });
    mode: 'modal'
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds ,
        };
    }
    componentDidMount(){

        let params = {ID:new Date().getTime() ,cityCode:global.constants.cityCode}
        var from = this.props.navigation.state.params.from
        let ret = null
        if(from==="车辆运营"){
            ret = BaseServiceApiNet.getOperator(params)
        }else{
            ret =BaseServiceApiNet.getRepairSafeList(params)
        }
            ret.then((responseJson) => {
                let mContent = responseJson.content
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(mContent),
                });
                //console.log(JSON.stringify(mContent))
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <ListView
                    style={{width:global.constants.width , height:global.constants.height/2}}
                    dataSource={this.state.dataSource}
                    renderRow={
                        (rowData,sectionId,rowId) =>
                            <TouchableOpacity onPress={()=> navigate("Alarm",{from:rowData.name})}>
                            <View>
                            <View style = {styles.lineContainerStyle}>
                                <Text style={[styles.textStyle_left,{fontSize:16}]}>{rowData.name}</Text>
                                <View style={{flex:1,flexDirection:'row-reverse',alignItems:'center'}}>
                                    <Image source={require("../img/arr_right.png")} style={{height:25,width:25}}></Image>
                                    <Text style={[styles.textStyle_left,{fontSize:16}]}>{rowData.count}</Text>
                                </View>
                            </View>
                                <View style={{height:0.5, backgroundColor:'#999999'}}/>
                            </View>
                            </TouchableOpacity>
                    }
                />
            </View>
        );
    }

}

let people = new People();
people.toString()

People.toString()

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
});

export default OperatorList ;
