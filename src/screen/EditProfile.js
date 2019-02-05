import React, {Component} from 'react';
import { 
  Platform, StyleSheet, Text, View, Image, ImageBackground,
  ActivityIndicator, TouchableOpacity, ScrollView, AsyncStorage,
  Modal, TextInput
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';

import InputField from '../component/InputField'
import APIController from '../utils/APIController';
import { API_CONSTANT } from "../utils/API";
import Constant from '../utils/Constants';

const ImagePickerOptions = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class EditProfile extends Component{

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      picPath: '',
      firstName: 'John',
      lastName: 'Smith',
      email: 'johnsmith@gmail.com',
      mobile: '9999988888',
      animating: true,
      buttonAnimation: false
    }
  }

  componentDidMount() {
    this.fetchProfileDetails()
  }

  // componentWillUnmount () {
  //   console.log('componentWillUnmount');
  // }

  async fetchProfileDetails() {
    const nthis = this;
    const user_id = await AsyncStorage.getItem(Constant.USER_ID);
    const url = API_CONSTANT.PROFILE_DISPLAY
    const obj = {
      user_id,
    }
    APIController.getMethod(url, obj).then((response) => {
      console.log(response);
      const data = response.user_profile[0];
      nthis.setState({
        data: data,
        firstName: data.name,
        lastName: data.last_name,
        email: data.email,
        mobile: data.mobile,
        animating: false,
      });
    });
  }
  

  openImagePicker() {
    ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
      console.log('Response = ', response);
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(response.uri);
        alert(response.uri);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          picPath: response.uri,
        });
      }
    });
  }

  
  async saveDetails(){
    const { picPath, firstName, lastName, email, mobile } = this.state;
    this.setState({buttonAnimation : true});
    const user_id = await AsyncStorage.getItem(Constant.USER_ID);
    const url = API_CONSTANT.UPDATE_PROFILE
    const obj = {
      user_id,
      name: firstName,
      last_name: lastName,
      mobile: mobile,
      email: email
    }
    APIController.getMethod(url, obj).then((response) => {
      this.setState({buttonAnimation : false});
      console.log(response);
      alert(response.message)
    }).catch((err) => {
      this.setState({buttonAnimation : false});
    })
  }

  profileContainer(){
    const { data, picPath, firstName, lastName, email, mobile } = this.state;
    // const fullName = (!data.name === false)?(data.name + data.last_name): 'John Smith';
    // const mobile = (!data.mobile_no === false)?data.mobile_no: '+91-9999988888';
    console.log(data);
    let url = '';//data.profile_image;
    if(!url === true && !picPath === false)  {
      url = picPath
    }
    const source = (!url)?require('../public/icons/username.png'):{ uri: url };
    console.log(source)
    return(
      <ImageBackground style={estyles.profileContainer} blurRadius={3} source={ source } >
        {//this.modal()
        }
        <TouchableOpacity style={estyles.profilePic} onPress = {()=>{this.openImagePicker(); }} >
          <Image style={{ resizeMode: 'contain', height: 60, width: 60, borderRadius: 30 }} source={source} />
          {/* <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff', marginTop: 8 }} >{firstName + ' ' + lastName }</Text>
          <Text style={{ fontSize: 10, fontWeight: '400', color: '#fff' }} >{mobile}</Text> */}
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  editUserDetails(){
    const { data, firstName, lastName, email, mobile, buttonAnimation } = this.state;
    console.log(data);
    return(
      <View>
        <View style = {{padding: 8, backgroundColor:'#d6d6d6'}} >
          <Text>User Details</Text>
        </View>
        <View style={{ padding: 8 }} >
          <Text style={{ fontSize: 12, color: '#a8a8a8' }} >First Name</Text>
          <TextInput
            placeholder={'First Name'}
            autoFocus = {true}
            style={{ height: 40, backgroundColor:'#d6d6d6' }}
            onChangeText={(text) => this.setState({firstName: text })}
            value={this.state.firstName}
          />
        </View>
        <View style={{ padding: 8 }} >
          <Text style={{ fontSize: 12, color: '#a8a8a8' }} >Last Name</Text>
          <TextInput
            placeholder={'Last Name'}
            autoFocus = {true}
            style={{ height: 40, backgroundColor:'#d6d6d6' }}
            onChangeText={(text) => this.setState({lastName: text })}
            value={this.state.lastName}
          />
        </View>
        <View style = {{padding: 8, marginTop: 10}} >
          <Text style = {{fontSize: 14, color: '#a8a8a8'}} >Email Address</Text>
          <TextInput
            placeholder={'Email Address'}
            autoFocus = {false}
            style={{ height: 40, backgroundColor:'#d6d6d6' }}
            onChangeText={(text) => this.setState({email: text })}
            value={this.state.email}
          />
        </View>
        <View style = {{padding: 8,  marginTop: 10}} >
          <Text style = {{fontSize: 14, color: '#a8a8a8'}} >Mobile Number</Text>
          <TextInput
            placeholder={'Mobile Number'}
            autoFocus = {false}
            style={{ height: 40, backgroundColor:'#d6d6d6' }}
            onChangeText={(text) => this.setState({mobile: text })}
            value={this.state.mobile}
          />
        </View>
        <TouchableOpacity style={[estyles.smallButton, { backgroundColor: 'red', marginTop: 20, marginBottom: 10, width: 170  }]} onPress={() => { this.saveDetails() }} >
        {(buttonAnimation)?<ActivityIndicator animating={true} color="#00ff00" />:
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 14, }} >Save Details</Text>}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { animating } = this.state;
    if (animating) {
      return (
        <View style = {{flex: 1, justifyContent:'center', alignItems: 'center'}} >
          <ActivityIndicator animating={true} size="large" color="#00ff00" />
        </View>
      )
    }
    return(
      <ScrollView style = {{flex: 1, backgroundColor: '#ffffff'}} >
        {this.profileContainer()}
        {this.editUserDetails()}
      </ScrollView>
    );
  }
}

const estyles = EStyleSheet.create({
  profileContainer: {
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  },
  image: {
    height: 100,
    width: '100%',
  },
  profilePic: {
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: 'transparent',
    justifyContent:'center',
    alignItems:'center',
  },
  smallButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    alignSelf: 'center'
  },
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalsubContainer: {
    height: '35%',
    width: '90%',
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingLeft: '5%',
    justifyContent: 'space-around'
  },
})