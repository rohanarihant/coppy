import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/Ionicons';


class Header extends Component {

  showImage() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.props.onClick()} >
          <Icon size={35} color="#235162" name="md-arrow-back" />
        </TouchableOpacity>
      </View>
    );
  }
  showRightImage() {
    //let url = ;
    return (
      <TouchableOpacity onPress={this.props.rightClick} >
        <View >
          {this.props.rightImage}
        </View>
      </TouchableOpacity>

    );
  }
  render() {
    return (
      <View style={estyles.container} >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {(this.props.back) ? this.showImage() : null}
            <View><Text style={{ fontSize: 20, color: '#235162', marginLeft: 20 }} >{this.props.title}</Text></View>
          </View>
          <View style={{ marginRight: 20 }}>
            {this.showRightImage()}
          </View>
        </View>
      </View>
    );
  }
}

const estyles = EStyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    paddingLeft: 10,
    borderBottomWidth: 2.5,
    borderBottomColor: '#D7D7D7'
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
});

export default Header;
