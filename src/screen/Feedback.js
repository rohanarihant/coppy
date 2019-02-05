
import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  WebView,
  AsyncStorage,
  TextInput,
  ScrollView
} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

import Button from '../component/button';
import APIController from '../utils/APIController';
import constant from '../utils/Constants';
import { API_CONSTANT } from "../utils/API";

class Feedback extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      email:'',
      message: ''
    }
  }

  async componentDidMount() {
    const nthis = this;
    const { email } = this.state;
    const userEmail = await AsyncStorage.getItem(constant.USER_EMAIL);
    this.setState({ email: userEmail });
    
  }

  async submitFeedback() {
    const nthis = this;
    const { message, animating } = this.state;
    this.setState({ animating: true });
    const user_id = await AsyncStorage.getItem(constant.USER_ID);

    const url = API_CONSTANT.USER_FEEDBACK;
    const obj = {
      user_id: user_id,
      message: message
    }
    await APIController.getMethod(url, obj).then((response) => {
      console.log(response);
      alert(response.message.status);
      nthis.setState({ animating: false });
    })
  }



  render() {
    const { email, animating } = this.state;
    return (
      <ScrollView style={styles.container} >
        <Text style={{ fontSize: 18, marginBottom: 20 }} >From : {email}</Text>
        <TextInput
          placeholder={'Write your feedback'}
          style={{ borderColor: 'gray', borderWidth: 0.6, padding: 8 }}
          onChangeText={(text) => this.setState({ message: text })}
          value={this.state.message}
          autoFocus={true}
          multiline={true}
          autoCorrect= {true}
          autoCapitalize={'sentences'}
          numberOfLines={8}
        />
        <Button
          style={styles.button}
          text='Save'
          animating={animating}
          loderCoder={'white'}
          onPress={() => this.submitFeedback()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor:'red',
    borderColor:'red',
    marginVertical:20,
    width: 140,
    height:40,
    alignSelf: 'center'
  }
});

export default Feedback;
