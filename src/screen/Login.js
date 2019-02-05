import React, {Component} from 'react';
import { 
  Platform, StyleSheet, Text, View, Image, ImageBackground, 
  ScrollView, ActivityIndicator, TouchableOpacity, Dimensions,
  AsyncStorage
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Left, Body, Right, Icon, Title, Segment, Content, Button} from 'native-base';
import CustomButton from '../component/button';
import InputField from '../component/InputField';

import APIController from '../utils/APIController';
import { API_CONSTANT } from "../utils/API";
import constant from '../utils/Constants';
const { height, width } = Dimensions.get('window');
import stylesCss from '../style/Style';
export default class Splash extends Component{

  constructor(props) {
    super(props);
    console.log(this.props.userType);
    console.log(this.props.userType !== constant.CUSTOMER)
    this.state = {
      flag: 1,
      userType: 2, //(this.props.userType)?this.props.userType:constant.CUSTOMER,
      animating: false,
      username: (this.props.userType !== constant.CUSTOMER) ? 'stadhawk@creaseart.com':'',
      password: (this.props.userType !== constant.CUSTOMER) ? '12121212':'',
      name: '',
      email: '',
      confirmPassword: '',
      sectionSelected:true
    }
    console.log(constant);
  }

  async componentDidMount() {
    let nthis = this;
    console.log('here');
    // const user = await AsyncStorage.getItem(constant.IS_LOG_IN);
    // console.log(!user === false && user === true) 
    // if(!user === false && user === true) {
    //   Actions.Home();
    // }

  }

  async login() {
    const { animating, userType } = this.state;
    console.log(userType)
    this.setState({animating : true});
    const { username, password } = this.state;
    // const url = API_CONSTANT.LOGIN;//'http://creaseart.com/wtemplate/itf_login.php/';
    if(!username) {
      alert('User name is mandatory');
      this.setState({animating : false});
      return;
    }
    if(!password) {
      alert('Password is mandatory');
      this.setState({animating : false});
      return;
    }
    const obj = {
      email: username,
      password,
    }
    console.log(userType);
    let url = '';
    if(userType === constant.VENDOR) {
      url = API_CONSTANT.VENDOR_LOGIN //vendor login api
    } else {
      url = API_CONSTANT.LOGIN
    }

    await APIController.getMethod(url, obj).then((response) => {
      console.log(response.status === 'failed');
      console.log(response.message)
      if(response.status === 'failed') {
        alert('Error : ' + response.message);
        this.setState({animating : false});
        return;
      }
      console.log(typeof response)
      console.log(response);
      const data = response.login[0];
      console.log(data.user_type === '1');
      const user_type = (data.user_type === '1' || data.user_type === '3')?constant.VENDOR:constant.CUSTOMER;
      console.log(user_type);
    
      console.log(data);
      console.log(data.user_id);
      if(!data.mobile){
        data.mobile = '';
      }
      //constant.IS_LOG_IN === false for demo only
      console.log(data.name+" "+data.last_name);
      AsyncStorage.multiSet(
        [[constant.IS_LOG_IN, 'true'],
        [constant.USER_NAME, data.name+" "+data.last_name],
        [constant.USER_EMAIL, data.email],
        [constant.USER_MOBILE, data.mobile],
        [constant.USER_PROFILE_PIC, data.profile_image],
        [constant.USER_TYPE, user_type]]
      )
      // alert(response.message);
        if(user_type === constant.VENDOR) {
          AsyncStorage.multiSet([[constant.VENDOR_ID, data.user_id], /*[constant.COMPANY_LOGO, data.company_logo] */ ] )
          Actions.VendorHomePage();
        }else {
          console.log('home')
          AsyncStorage.multiSet([[constant.USER_ID, data.user_id]])
          Actions.Home();
        }
        this.setState({animating : false});
    }).catch((err) => {
      console.log(err);
      alert(err.message);
      this.setState({animating : false});
    })
  }

  async signUp() {
    const { name, email, password, confirmPassword } = this.state;
    const { animating } = this.state;
    this.setState({animating : !animating});
    if(password !== confirmPassword){
      alert('Passwords don\'t match');
      return;
    }
    const url = API_CONSTANT.REGISTER;//'http://creaseart.com/wtemplate/itf_login.php/';
    const obj = {
      name,
      email,
      pass: password,
    }
    await APIController.getMethod(url, obj).then((response) => {
      if(response.status === 'failed') {
        alert('Error : ' + response.message);
        this.setState({animating : false});
        return;
      }
      console.log(typeof response)
      console.log(response);
      // AsyncStorage
      // if(userType === constant.VENDOR) {
      //   AsyncStorage.multiSet([[constant.IS_LOG_IN, true], [constant.USER_TYPE, constant.VENDOR]])
      //   Actions.VendorHomePage();
      // }else {
      //   AsyncStorage.multiSet([[constant.IS_LOG_IN, true], [constant.USER_TYPE, constant.CUSTOMER]])
      //   console.log('home')
      //   Actions.Home();
      // }
      alert('Successfully registered, Please login');
      this.setState({animating : false, flag:1 });
    }).catch((err) => {
      console.log(err)
      alert(err.message);
      this.setState({animating : false});
    })
  }

  async forgotPassword() {
    const { email } = this.state;
    const url = API_CONSTANT.FORGOT_PASSWORD;//'http://creaseart.com/wtemplate/itf_login.php/';
    const obj = {
      emailid: email,
    }
    await APIController.getMethod(url, obj).then((res) => {
      alert('Password has been sent to your registerd Email Id');
    }).catch((err) => {
      console.log(err)
      alert(err.message);
      this.setState({animating : false});
    })
  }

  selectUserType() {
    const { userType } = this.state;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 20}} >
        <TouchableOpacity style = {[stylesCss.selectUserType, {backgroundColor: (userType === constant.CUSTOMER)?'green': '#a8a8a8'} ]} onPress = {()=>{this.setState({type: constant.CUSTOMER})}} >
          <Text style = {{fontSize: 18}} >User</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {[stylesCss.selectUserType, {backgroundColor: (userType === constant.VENDOR)?'green': '#a8a8a8'} ]} onPress = {()=>{this.setState({type: constant.VENDOR})}} >
          <Text style = {{fontSize: 18}} >Vendor</Text>
        </TouchableOpacity>
      </View>
    )
  }
  toggleSegment(e){
    let {sectionSelected} = this.state;
    this.setState({sectionSelected:!sectionSelected})
  }
  subContainer1(){
   
    const { animating, userType } = this.state;
    return (
      <ImageBackground style={stylesCss.image} source={require('../public/icons/login-bg-light.png')} >
        <ScrollView style={stylesCss.subContainer_2}>
          <Image style={{height:200, width:200, resizeMode:'contain', marginRight:20, alignSelf:'center'}} source={require('../public/icons/logo.png')} />
        
            <Segment style={{backgroundColor:'transparent',width:width}}>
              <Button style = {this.state.sectionSelected?stylesCss.selectedSection:stylesCss.unselectedSection} onPress={this.toggleSegment.bind(this)} first><Text style={this.state.sectionSelected?{color:"red", fontSize:20}:{color:"#fff", fontSize:20}}>Vendor</Text></Button>
              <Button style = {this.state.sectionSelected?stylesCss.unselectedSection:stylesCss.selectedSection} onPress={this.toggleSegment.bind(this)} last><Text style={this.state.sectionSelected?{color:"#fff", fontSize:20}:{color:"red", fontSize:20}}>Rider</Text></Button>
            </Segment>
           
          {this.state.sectionSelected?<View style={stylesCss.subContainer3} >
          {/* Vender Section */}
            <InputField
              leftIcon= {require('../public/icons/username.png')}
              placeholder='Username'
              secureTextEntry = {false}
              style = {{color: '#000000',  fontSize: 18, width:240 }}
              onChangeText={(text) => this.setState({username: text})}
              value = {this.state.username}
              returnKeyType = {'next'}
              containerStyle = {{backgroundColor:'#a8a8a8',}}
            />
            <InputField 
              leftIcon= {require('../public/icons/password.png')}
              placeholder='Password'
              secureTextEntry = {true}
              style = {{color: '#000000', backgroundColor:'#a8a8a8', fontSize: 18, width:240 }}
              onChangeText={(text) => this.setState({password: text})}
              value = {this.state.password}
              returnKeyType = {'done'}
              containerStyle = {{marginTop:20, backgroundColor:'#a8a8a8',}}
            />
            {(userType === constant.CUSTOMER)?<Text style={{alignSelf:'flex-end', marginRight:30, marginTop:10 }} onPress = {()=> {this.forgotPassword()}} >Forgot Password ?</Text>:null}
            <CustomButton style = {{backgroundColor:'red', borderColor:'red', marginVertical:15}} text='Get Started' animating= {animating} loderCoder = {'white'} onPress = {()=>this.login()} />
         
            {(userType === constant.CUSTOMER)?<View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
              <View style = {{ width:80, height:0.5, backgroundColor: 'black' }} />
              <Text style={{marginHorizontal: 20,}} >or Connect with</Text>
              <View style = {{ width:80, height:0.5, backgroundColor: 'black' }} />
            </View>:null}
            {(userType === constant.CUSTOMER)?<View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:80}} >
              <Image style={{height:150, width:150, resizeMode:'contain' }} source={require('../public/icons/facebook.png')} />
              <Image style={{height:150, width:150, resizeMode:'contain' }} source={require('../public/icons/google-plus.png')} />
            </View>:null}
            {/* {(userType === constant.CUSTOMER)?<Text onPress = {()=> {this.setState({flag: 2, password: '', paddingBottom:10})}}> Create Account</Text>:null} */}
            <Text style={{ paddingBottom:10}} onPress = {()=> {this.setState({flag: 2, password: '' })}}> Don't have an account? <Text style ={{color:'red'}} > Please Create One</Text></Text>
          </View>:
          // Rider Section
          <View style={stylesCss.subContainer3} > 
            <InputField
              leftIcon= {require('../public/icons/username.png')}
              placeholder='Username'
              secureTextEntry = {false}
              style = {{color: '#000000',  fontSize: 18, width:240 }}
              onChangeText={(text) => this.setState({username: text})}
              value = {this.state.username}
              returnKeyType = {'next'}
              containerStyle = {{backgroundColor:'#a8a8a8',}}
            />

            {(userType === constant.CUSTOMER)?<Text style={{alignSelf:'flex-end', marginRight:30, marginTop:10 }} onPress = {()=> {this.forgotPassword()}} >Forgot Password ?</Text>:null}
            <CustomButton style = {{backgroundColor:'red', borderColor:'red', marginVertical:15}} text='Get Started' animating= {animating} loderCoder = {'white'} onPress = {()=>this.login()} />
          
            {(userType === constant.CUSTOMER)?<View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
              <View style = {{ width:80, height:0.5, backgroundColor: 'black' }} />
              <Text style={{marginHorizontal: 20,}} >or Connect with</Text>
              <View style = {{ width:80, height:0.5, backgroundColor: 'black' }} />
            </View>:null}
            {(userType === constant.CUSTOMER)?<View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:80}} >
              <Image style={{height:150, width:150, resizeMode:'contain' }} source={require('../public/icons/facebook.png')} />
              <Image style={{height:150, width:150, resizeMode:'contain' }} source={require('../public/icons/google-plus.png')} />
            </View>:null}
            {/* {(userType === constant.CUSTOMER)?<Text onPress = {()=> {this.setState({flag: 2, password: '', paddingBottom:10})}}> Create Account</Text>:null} */}
            <Text style={{ paddingBottom:10}} onPress = {()=> {this.setState({flag: 2, password: '' })}}> Don't have an account? <Text style ={{color:'red'}} > Please Create One</Text></Text>
          </View>
          }
        </ScrollView>
      </ImageBackground>
    );
  }
  // subContainer2(){
  //   const { animating } = this.state;
  //   return (
  //     <ImageBackground style={stylesCss.image} source={require('../public/icons/login-bg-light.png')} >
  //       <ScrollView style={stylesCss.subContainer2}>
  //         <Image style={{height:200, width:200, resizeMode:'contain', marginRight:20, alignSelf:'center'}} source={require('../public/icons/logo.png')} />
  //         {//this.selectUserType()
  //         }
  //         <View style={stylesCss.subContainer3} >
  //           <InputField 
  //             leftIcon= {require('../public/icons/username.png')}
  //             placeholder='Name'
  //             secureTextEntry = {false}
  //             style = {{color: '#000000',  fontSize: 18 }}
  //             onChangeText={(text) => this.setState({name: text})}
  //             value = {this.state.name}
  //             returnKeyType = {'next'}
  //             containerStyle = {{backgroundColor:'#a8a8a8',}}
  //           />
  //           <InputField 
  //             leftIcon= {require('../public/icons/mail.png')}
  //             placeholder='Email'
  //             secureTextEntry = {false}
  //             style = {{color: '#000000', backgroundColor:'#a8a8a8', fontSize: 18 }}
  //             onChangeText={(text) => this.setState({email: text})}
  //             value = {this.state.email}
  //             returnKeyType = {'next'}
  //             containerStyle = {{marginTop:20, backgroundColor:'#a8a8a8',}}
  //           />
  //           <InputField 
  //             leftIcon= {require('../public/icons/password.png')}
  //             placeholder='Password'
  //             secureTextEntry = {true}
  //             style = {{color: '#000000', backgroundColor:'#a8a8a8', fontSize: 18 }}
  //             onChangeText={(text) => this.setState({password: text})}
  //             value = {this.state.password}
  //             returnKeyType = {'next'}
  //             containerStyle = {{marginTop:20, backgroundColor:'#a8a8a8',}}
  //           />
  //           <InputField 
  //             leftIcon= {require('../public/icons/password.png')}
  //             placeholder='Confirm Password'
  //             secureTextEntry = {true}
  //             returnKeyType = {'next'}
  //             style = {{color: '#000000', backgroundColor:'#a8a8a8', fontSize: 18 }}
  //             onChangeText={(text) => this.setState({confirmPassword: text})}
  //             value = {this.state.confirmPassword}
  //             containerStyle = {{marginTop:20, backgroundColor:'#a8a8a8',}}
  //           />
           
  //           <CustomButton style = {{backgroundColor:'red', borderColor:'red', marginVertical:20}} text='Get Started' animating= {animating} loderCoder = {'white'}  onPress = {()=>this.signUp()} />
  //           <Text style={{ paddingBottom:10}} onPress = {()=> {this.setState({flag: 1, password: ''})}}>Already have an account? <Text style ={{color:'red'}} > Please Login</Text></Text>
  //         </View>
  //       </ScrollView>
  //     </ImageBackground>
  //   );
  // }

  render() {
    const { flag, animating } = this.state;
    console.log('flag : ', flag);
    return (flag === 1)?this.subContainer1():this.subContainer1();
    // return(
    //   <Text>vsdbfhjvbdjfhbvjhdb</Text>
    // );
  }
}

// const estyles = EStyleSheet.create({
  
//   selectUserType: {
//     height: 40,
//     width: 120,
//     borderRadius: 30,
//     alignItems:'center',
//     justifyContent: 'center'
//   },
//   selectedSection:{
//     width:width/2,
//     borderRadius:0,
//     backgroundColor:'#fff',
//     justifyContent:'center'
//   },
//   unselectedSection:{
//     width:width/2,
//     borderRadius:0,
//     backgroundColor:'#000',
//     justifyContent:'center',
//     color:'#fff'
//   }
// })