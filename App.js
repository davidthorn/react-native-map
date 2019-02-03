/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import {  AppNavigator } from './map/Map'
const AppContainer = createAppContainer(AppNavigator);

type Props = {};
export default class App extends Component<Props> {

  static navigationOptions = {
    //To hide the NavigationBar from current Screen
   
    header: {
      tintColor: 'red',
      style: {
        backgroundColor: 'orange'
      }
    }
  };

  render() {
    return <AppContainer/>
  }
}
