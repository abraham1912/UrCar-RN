/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ActionSheetIOS,
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import Page1 from './page1' ;
import Page2 from './page2' ;




export class HomeScreen extends Component {
    static navigationOptions = {
        title: '首页',
    };
    constructor(props){
        super(props);
        this.state = {clicked : ''}
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React !
                </Text>
                <Text style={styles.instructions} >
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                </Text>
                <Button style ={ styles.mButton}
                        onPress={()=>navigate('page1')}
                        title = "第二页"
                        color="#000000"

                ></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    mButton: {
        width: 80 ,
        height :50 ,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        backgroundColor: "#000000"
    },
});

const MyApp = StackNavigator({
    //key（Home）代表页面的文件名  value（Page1）代表导入的组件名称 import
    Home: { screen: HomeScreen },
    page1: { screen: Page1 },
    page2: { screen: Page2 },
});

 export default MyApp ;