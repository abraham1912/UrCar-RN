import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';

import {
    MapView,
    MapTypes,
    Geolocation, MapModule
} from 'react-native-baidu-map';

import {styles} from './MyStyles'
 import './constants' ;
 import BaseServiceApiNet from '../utils/BaseServiceApiNet';

class Location extends Component {
    static navigationOptions = ({navigation}) => ( {
        headerTitle: '位置',
        gesturesEnabled : false
    })

    constructor() {
        super();
        this.state = {
            center: { longitude: global.constants.defaultCenter.longitude,
                latitude: global.constants.defaultCenter.latitude },
            markers: [{ longitude: 113.981718, latitude: 22.542449, title: "Window of the world" },
                { longitude: 113.995516, latitude: 22.537642, title: "haha" }]
        };
    }

    componentDidMount(){
        Geolocation.getCurrentPosition()
            .then(data => {
            this.setState({
                marker: { latitude: data.latitude,
                    longitude: data.longitude, title: 'Your location'},
                center: { latitude: data.latitude, longitude: data.longitude,
                    rand: Math.random() }
            });
            })
            .catch(e =>{
            })
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <MapView style={{height:global.constants.deviceHeight,width:global.constants.deviceWidth}}
                         trafficEnabled={false}
                         baiduHeatMapEnabled={false}
                         zoom={18} mapType={MapTypes.NORMAL}
                         center={this.state.center}
                         marker={this.state.marker}
                         markers={this.state.markers}
                         onMarkerClick={(e) => { console.warn(JSON.stringify(e)); }}
                         onMapClick={(e) => { }} >
                </MapView>
            </View>
        );
    }
}

export default Location ;
