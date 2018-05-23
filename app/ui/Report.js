import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableWithoutFeedback,
    WebView,
} from 'react-native';


class Report extends Component {
    static navigationOptions = ({navigation}) => ( {
        headerTitle: '统计报表',
    });
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <WebView bounces={false}
                         scalesPageToFit={true}
                         javaScriptEnabled={true}
                         domStorageEnabled={true}
                         startInLoadingState={true}
                         automaticallyAdjustContentInsets={true}
                         source={{uri:global.constants.baseUrl+"/static/statistics.html",method: 'GET'}}
                         style={{width:global.constants.width, height:global.constants.height}}>
                </WebView>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
});

export default Report ;
