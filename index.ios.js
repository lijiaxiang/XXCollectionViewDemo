/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import  XXCollectionView from './XXCollectionView';
import  CollectionView from './CollectionView';
import  XCollectionView from './XCollectionView';

export default class XXCollectionViewDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <XCollectionView/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

AppRegistry.registerComponent('XXCollectionViewDemo', () => XXCollectionViewDemo);
