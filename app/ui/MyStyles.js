import React from 'react';
import {
    StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#eeeeee"
    },
    containerRow: {
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
    },
    containerRowNavagation: {
        height:44,
        flexDirection:'row',
        alignItems:'center',
        marginTop:13,
    },
    backImage: {
        height:30,
        width:30,
    },
    line: {
        height:0.5,
        backgroundColor:'#999999'
    },
    lineVertical: {
        width:0.5,
        backgroundColor:'#999999'
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
