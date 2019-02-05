
import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  WebView
} from 'react-native';

import APIController from '../utils/APIController';
import { API_CONSTANT } from "../utils/API";

class AboutCreaseArt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
      data:''
    }
  }

  async componentDidMount() {
    const nthis = this;
    const url = API_CONSTANT.ABOUT_CREASEART;
    const obj = {
      id:8
    }
    await APIController.getMethod(url, obj).then((response) => {
      console.log(response);
      const data = response.content[0].page_description;
      console.log(data);
      nthis.setState({data:data, animating: false});
    })
  }

  text() {
    const { data } = this.state;
    console.log(data)
    return(
      <WebView
        originWhitelist={['*']}
        source={{ html: data }}
        // style ={{fontSize: '18'}}
      />
    );
  }

  loader() {
    return(
      <ActivityIndicator size="large" color = {'red'}  /> 
    );
  }


  render() {
    const { animating } = this.state;
    return (
      <View style = {styles.container} >
        {(this.state.animating)?this.loader():this.text()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:10,
    paddingHorizontal:10,
    paddingBottom:15,
    backgroundColor: 'white',
    // alignItems: 'center',
    // top:30
  }
});

export default AboutCreaseArt;
