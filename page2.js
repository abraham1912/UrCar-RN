import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';


 class Page2 extends Component {
     static navigationOptions = {
         title: '第三页',
     };
    constructor(props){
        super(props);
        this.state = {clicked : ''}
    }
    render() {
        const { goBack } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {params.user}Welcome to React !
                </Text>
               <Button title = "第三页"
                       onPress = {()=>goBack()}
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

 export default Page2 ;
