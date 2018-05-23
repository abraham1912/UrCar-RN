import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';


 class Page1 extends Component {
     static navigationOptions = {
         title: '第二页',
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
               <Button title = "第三页"
                       onPress = {()=>navigate('page2',{user : "wangchong"})}
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

});

 export default Page1 ;
