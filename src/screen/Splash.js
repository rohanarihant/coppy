import React, {Component} from 'react';
import { 
  Platform, StyleSheet, Text, View, Image, ImageBackground,
  ActivityIndicator, TouchableOpacity, AsyncStorage
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

import constant from '../utils/Constants';

export default class Splash extends Component{

  constructor(props) {
    super(props);
    this.state = {
      flag: 1,
    }
  }

  async isLoggedIn() {
    const isLoggedIn =  await AsyncStorage.getItem(constant.IS_LOG_IN);
    if(!isLoggedIn === false && isLoggedIn === 'true'){
      Actions.VendorHomePage();
    }else {
      Actions.Login({ userType: constant.VENDOR })
    }

    // const isLoggedIn =  await AsyncStorage.getItem(constant.IS_LOG_IN);
    // if (!isLoggedIn === false && isLoggedIn === 'true') {
    //   const userType = await AsyncStorage.getItem(constant.USER_TYPE);
    //   if (!userType === false && userType === constant.CUSTOMER) {
    //     Actions.Home();
    //   } else if (!userType === false && userType === constant.VENDOR) {
    //     Actions.VendorHomePage();
    //   }
    // }
  }

  componentDidMount() {
    let nthis = this;
    console.log('here');
    setTimeout(() => {
      // alert('3');
      console.log('inside');
      // nthis.setState({ flag: 2 })
      nthis.isLoggedIn()
    }, 1000);
    
  }

  subContainer1(){
    // alert('1');
    return (
      <ImageBackground style={estyles.image} source={require('../public/icons/splash-bg.png')} >
        <View style={estyles.subContainer1}>
          {/* <ActivityIndicator size="large" color="yellow" /> */}
          {/* <Image style={estyles.logo} source={require('../public/icons/logo.png')} />
          <Text style={{ fontSize: 20, color: '#ffffff', marginBottom: 90 }} >www.creaseart.com</Text> */}
        </View>
      </ImageBackground>
    );
  }
  subContainer2(){
    // alert('2');
    return (
      <ImageBackground style={estyles.image} source={require('../public/icons/splash-bg.png')} >
        <View style={estyles.subContainer2}>
          <Image style={estyles.logo} source={require('../public/icons/logo.png')} />
          <View style={estyles.subContainer3} >
            <Text style = {{fontSize: 18, marginBottom: 30 }} >Use As A</Text>
            <View style = {{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center' }} >
              <TouchableOpacity style = {[estyles.smallButton, { backgroundColor: 'red'}]} onPress = {()=>{Actions.Login({ userType: constant.CUSTOMER })}} >
                <Text style = {{color: 'white', fontWeight: '500' }} >CUSTOMER</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {[estyles.smallButton, { backgroundColor: 'black'}]} onPress = { ()=>{Actions.Login({ userType: constant.VENDOR })} } >
                <Text style = {{color: 'white', fontWeight: '500' }} >VENDOR</Text>
              </TouchableOpacity>
            </View>
            {/* <Button style = {{backgroundColor:'transparent', borderColor:'white'}} text='Sign Up' onPress = {()=>{Actions.Login({flag: 2})}} />
            <Button style = {{backgroundColor:'red', borderColor:'red', marginTop:25}} text='Login' onPress = {()=>{Actions.Login({flag: 1})}} /> */}
          </View>
      </View>
      </ImageBackground>
    );
  }


  render() {
    const { flag } = this.state;
    console.log('flag : ', flag);
    // return (flag === 1)?this.subContainer1():this.subContainer2();
    return this.subContainer1();
  }
}

const estyles = EStyleSheet.create({
  logo: {
    height: '20%',
    width: '100%',
    resizeMode: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent:'center',
  },
  subContainer1: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  subContainer2: {
    height: '80%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  subContainer3: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginTop: 30,
    padding: 20,
    borderRadius:10
  },
  smallButton: {
    width: 120,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius:5,
    marginHorizontal: 15,
  }
})