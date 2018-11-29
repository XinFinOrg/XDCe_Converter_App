/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow
*/

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import './shim.js'
// ...the rest of your code
import crypto from 'crypto'
// use crypto
var a = crypto.randomBytes(32).toString('hex')

const Web3 = require('web3');

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://ropsten.infura.io/'),
);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: a +
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      privateKey: '',
      data: '',
      text: '',
      toAddress: '',
      amount: '',
    }

    this._onPressButton = this._onPressButton.bind(this);
    // this.sendTransaction = this.sendTransaction.bind(this);

  }



  _onPressButton() {
    var data = web3.eth.accounts.create();
    console.log(data.address);
    this.setState({ address: data.address, privateKey: data.privateKey, data: data.toString() });
  }


  componentDidMount(){

    web3.eth.getBalance("0x81b7E08F65Bdf5648606c89998A9CC8164397647", (err, balance) => {
      console.log(balance, err)
      this.setState({ text:balance})
    })

  }



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Generate Address</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.instructions}>Your Address is :{this.state.address}</Text>
        <Text style={styles.instructions}>Your PK is :{this.state.privateKey}</Text>
        <Text style={styles.instructions}>Balance is: {this.state.text}</Text>
        <Text style={styles.instructions}>Enter Senders Addresss</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({ toAddress: text })}
        />
        <TouchableOpacity onPress={this.sendTransaction}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Send Ether</Text>
          </View>
        </TouchableOpacity>
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
