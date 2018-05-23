import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableWithoutFeedback,
    ActionSheetIOS,
} from 'react-native';


import './constants' ;
import BaseServiceApiNet from "../utils/BaseServiceApiNet";

let BUTTONS = ['从相册选择','拍照','取消'];
let ImagePicker = require('react-native-image-picker');

class UserInfo extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: '个人资料',
        headerRight: (
            <Text style={{fontSize:16,color:'#666666',marginRight:10}} onPress={()=>alert("123")}>
                完成
            </Text>
        ),
    })

    constructor(props){
        super(props);
        this.state={
            avatarSource : global.constants.imageUrl === ""?require("../img/default_avatar.png"):{uri:global.constants.imageUrl}
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{height:0.5, backgroundColor:'#999999',marginTop:10}}/>
                <TouchableWithoutFeedback onPress={()=>{
                    startChangeAvatar(this)
                }}>
                    <View style = {styles.lineContainerStyle}>
                        <Text style={[styles.textStyle_left,{fontSize:18}]}>头像</Text>
                        <View style={{flex:1,flexDirection:'row-reverse',alignItems:'center'}}>
                            <Image source={require("../img/arr_right.png")} style={{height:25,width:25}}></Image>
                            <Image style={styles.imageStyle}
                                   source={this.state.avatarSource}/>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{height:0.5, backgroundColor:'#999999',marginLeft:10}}/>
                <TouchableWithoutFeedback >
                    <View style = {styles.lineContainerStyle}>
                        <Text style={[styles.textStyle_left,{fontSize:18}]}>用户名</Text>
                        <View style={{flex:1,flexDirection:'row-reverse',alignItems:'center'}}>
                           <Text style={[styles.textStyle_left,{fontSize:18,marginRight:10}]}>{global.constants.userName}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{height:0.5, backgroundColor:'#999999',marginLeft:10}}/>
                <TouchableWithoutFeedback >
                    <View style = {styles.lineContainerStyle}>
                        <Text style={[styles.textStyle_left,{fontSize:18}]}>电话</Text>
                        <View style={{flex:1,flexDirection:'row-reverse',alignItems:'center'}}>
                            <Text style={[styles.textStyle_left,{fontSize:18,marginRight:10}]}>{global.constants.phone}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

function startChangeAvatar(context) {
    var options = {
        title: null, // 选择器的标题，可以设置为空来不显示标题
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
        chooseFromLibraryButtonTitle: '从相册选择', // 调取相册的按钮，可以设置为空使用户不可选择相册照片
        mediaType: 'photo', // 'photo' or 'video'
        videoQuality: 'high', // 'low', 'medium', or 'high'
        durationLimit: 10, // video recording max time in seconds
        maxWidth: 100, // photos only默认为手机屏幕的宽，高与宽一样，为正方形照片
        maxHeight: 100, // photos only
        allowsEditing: false, // 当用户选择过照片之后是否允许再次编辑图片
    };

    ImagePicker.showImagePicker(options, (response) => {
        //console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePickerManager Error: ', response.error);
        }
        else if (response.customButton) {
            // 这是当用户选择customButtons自定义的按钮时，才执行
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            // You can display the image using either data:
            var source = null
            if (global.constants.paltform === 'android') {
                source = {uri: response.uri, isStatic: true};
            } else {
                source = {
                    uri: response.uri.replace('file://', ''),
                    isStatic: true
                };
            }

            context.setState({
                avatarSource: source
            });

            console.log(source.uri)
        }
    });
}

function showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: 2,
        },
        (buttonIndex) => {
            if (buttonIndex===0){

            }else if (buttonIndex===1){  //拍照

            }
        })
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

});

export default UserInfo ;
