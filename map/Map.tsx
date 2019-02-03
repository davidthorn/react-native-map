/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { createStackNavigator } from "react-navigation";

type Props = {};
interface State {
    coords: {
        latitude: number,
        longitude: number
    }
    heading: number
}

class MapFeature extends Component<Props, State> {

    static navigationOptions = {
        header: null
    }

    constructor(props: Props, state: State) {
        super(props, state)
        this.state = {
            heading: 300,
            coords: {
                latitude: 51.5056051,
                longitude: 7.420665
            }

        }
    }

    async requestGPSPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    message: "Need the GPS Permission please",
                    title: 'GPS Required'
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                navigator.geolocation.watchPosition(position => {
                    this.setState({
                        coords: position.coords,
                        heading: position.coords.heading || 90
                    })
                }, error => {

                }, {
                        distanceFilter: 2,
                        enableHighAccuracy: true
                    })
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    componentDidMount() {
        this.requestGPSPermission()
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={false} hidden={true} backgroundColor="transparent" barStyle="dark-content" />

                <MapView
                    showsUserLocation={true}
                    showsTraffic={true}
                    style={styles.map}

                    initialRegion={{
                        latitude: this.state.coords.latitude,
                        longitude: this.state.coords.longitude,
                        latitudeDelta: 0.0005,
                        longitudeDelta: 0.0005,

                    }}
                    camera={{
                        heading: this.state.heading,
                        altitude: 100,
                        center: this.state.coords,
                        pitch: 1,
                        zoom: 15
                    }}
                >
                    <Marker title="Location" coordinate={
                        this.state.coords
                    }  ></Marker>
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'red',
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

const AppNavigator = createStackNavigator(
    {
        Home: MapFeature
    },
    {
        initialRouteName: "Home"
    }
);


export { AppNavigator }