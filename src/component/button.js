import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';

class CustomButton extends Component {

  constructor(props) {
    super(props);

  }

  text() {
    return(
      <Text style={[{ fontSize: 18, fontWeight:'bold', color: '#ffffff' }, this.props.textStyle]} >{this.props.text}</Text>
    );
  }

  loader() {
    const { loderCoder } = this.props;
    return(
      <ActivityIndicator size="small" color={(loderCoder)?loderCoder:"white"} /> 
    );
  }

  render() {
    return (
      <TouchableOpacity style = {[styles.button, this.props.style]} onPress = {this.props.onPress} >
        {(this.props.animating)?this.loader():this.text()}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    height:40,
    backgroundColor:'red',
    borderRadius:30,
    borderWidth:1,
    borderColor:'red',
    justifyContent: 'center',
    alignItems:'center'
  }
});

export default CustomButton;
