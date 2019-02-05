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

export default class MyProfile extends Component{

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      picPath: '',
      recentOrder: '',
      animating: true,
      buttonAnimation: false
    }
  }

  componentDidMount() {
    this.fetchProfileDetails()
  }

  componentWillReceiveProps(){
    console.log(this.props);
    console.log('componentWillReceiveProps');
    this.fetchProfileDetails()
  }

  async fetchProfileDetails() {
    const nthis = this;
    this.setState({animating: true})
    const user_id = await AsyncStorage.getItem(Constant.USER_ID);
    const url = API_CONSTANT.PROFILE_DISPLAY
    const obj = {
      user_id,
    }
    APIController.getMethod(url, obj).then((response) => {
      console.log(response);
      const data = response.user_profile[0];
      nthis.setState({data: data });
    });
    
    let lastOrder = '';
    APIController.getMethod(API_CONSTANT.USER_ORDER, obj).then((response) => {
      console.log(response);
      const orders = response.user_order;
      if(!orders || !orders[0].order_id === true) {
        nthis.setState({ animating: false });
        return;
      }
      let lastOrder = orders[0];
      console.log(lastOrder)
      orders.map((obj) => {
        lastOrder = (lastOrder.order_date > obj.order_date)?lastOrder:obj;
        console.log(lastOrder);
      })
      nthis.setState({ recentOrder: lastOrder, animating: false });
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

  async changePassword() {
    const { data, buttonAnimation } = this.state;
    const email = data.email;
    const url = API_CONSTANT.FORGOT_PASSWORD;//'http://creaseart.com/wtemplate/itf_login.php/';
    const obj = {
      emailid: email,
    }
    this.setState({buttonAnimation: true});
    await APIController.getMethod(url, obj).then((res) => {
      alert('Password has been sent to your registerd Email Id');
      this.setState({buttonAnimation : false});
    }).catch((err) => {
      console.log(err)
      alert(err.message);
      this.setState({buttonAnimation : false});
    })
  }
  

  profileContainer(){
    const { data, picPath } = this.state;
    const fullName = (!data.name === false)?(data.name + ' ' + data.last_name): 'John Smith';
    const mobile = (!data.mobile_no === false)?data.mobile_no: '+91-9999988888';
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
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff', marginTop: 8 }} >{fullName}</Text>
          <Text style={{ fontSize: 10, fontWeight: '400', color: '#fff' }} >{mobile}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  userDetails(){
    const { data, buttonAnimation } = this.state;
    console.log(data);
    console.log((!data.name === false))
    const fullName = (!data.name === false)?(data.name + ' ' + data.last_name): 'John Smith';
    const email = (!data.email === false)?data.email:'johnsmith@gmail.com';
    const mobile = (!data.mobile_no === false)?data.mobile_no: '+91-9999988888';

    return(
      <View>
        <View style = {{padding: 8, backgroundColor:'#d6d6d6'}} >
          <Text>User Details</Text>
        </View>
        <View style={{ padding: 8 }} >
          <Text style={{ fontSize: 12, color: '#a8a8a8' }} >Full Name</Text>
          <Text  style= {{fontSize: 16, fontWeight: '600'}} >{fullName}</Text>
        </View>
        <View style = {{padding: 8, marginTop: 10}} >
          <Text style = {{fontSize: 14, color: '#a8a8a8'}} >Email Addresses</Text>
          <Text  style= {{fontSize: 16, fontWeight: '600'}} >{email}</Text>
        </View>
        <View style = {{padding: 8,  marginTop: 10}} >
          <Text style = {{fontSize: 14, color: '#a8a8a8'}} >Mobile Number</Text>
          <Text  style= {{fontSize: 16, fontWeight: '600'}} >{mobile}</Text>
        </View>
        <TouchableOpacity style={[estyles.smallButton, { backgroundColor: 'red', marginTop: 20, width: 170 }]} onPress={() => { this.changePassword() }} >
        {(buttonAnimation)?<ActivityIndicator animating={true} color="#00ff00" />:
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 14, }} >Change Passward</Text>}
        </TouchableOpacity>
      </View>
    );
  }

  orders() {
    const { recentOrder } = this.state;
    console.log(!recentOrder);
    if (!recentOrder) {
      return (
        <View style={{ marginTop: 15 }}>
          <View style={{ padding: 8, backgroundColor: '#d6d6d6' }} >
            <Text>Recent Order</Text>
          </View>
          <View style={{ marginHorizontal:5 }} >
            <Text>No recent order found</Text>
          </View>
        </View>
      )
    }
    return(
      <View style = {{marginTop: 15}}>
        <View style = {{padding: 8, backgroundColor:'#d6d6d6'}} >
          <Text>Recent Order</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:5 }} >
          <View style = {{  }} >
            <Text style={{ marginTop: 10, fontSize: 17, fontWeight: '600' }} >Order Id #{recentOrder.order_id}</Text>
            <View style={{ marginTop: 10 }} >
              <Text style={{ fontSize: 15, fontWeight: '500' }} >Pickup Date & Time</Text>
              <Text style={{ fontSize: 14, color: '#a8a8a8' }} >13 Dec, 2018 & 9:00AM to 12:00AM </Text>
            </View>
            <View style={{ marginTop: 5 }} >
              <Text style={{ fontSize: 15, fontWeight: '500' }} >Delivery Date & Time</Text>
              <Text style={{ fontSize: 14, color: '#a8a8a8' }} >13 Dec, 2018 & 9:00AM to 12:00AM </Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }} >
            <View style={[estyles.smallButton, {borderRadius:5, backgroundColor: 'orange', marginTop: 15, paddingHorizontal: 10 }]} >
              <Text style={{ color: 'white', fontWeight: '500', fontSize: 12, }} >Pickup Process</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '600', marginTop:8 }} >Price</Text>
            <Text style={{ fontSize: 14, color: '#a8a8a8', marginTop:2 }} >${recentOrder.total_amount}</Text>
          </View>
        </View>
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
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }} >
        {this.profileContainer()}
        {this.userDetails()}
        {this.orders()}
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
    paddingVertical: 8,
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