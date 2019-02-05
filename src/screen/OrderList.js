
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
  ScrollView,
  ImageBackground,
  Image
} from 'react-native';

// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Sae } from 'react-native-textinput-effects';

import Button from '../component/button';
import APIController from '../utils/APIController';
import constant from '../utils/Constants';
import { API_CONSTANT } from "../utils/API";
import { Actions } from 'react-native-router-flux';

class OrderList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
      userName: '',
      userMobile: '',
      orderList: ''
    }
  }

  async componentDidMount() {
    const nthis = this;
    const { userName, userMobile } = this.state;
    const name = await AsyncStorage.getItem(constant.USER_NAME);
    const mobile = await AsyncStorage.getItem(constant.USER_MOBILE);
    this.setState({ userName: name, userMobile: mobile });
    this.fetchOrders();
  }

  async fetchOrders() {
    const nthis = this;
    const { animating } = this.state;
    this.setState({ animating: true });

    const user_id = await AsyncStorage.getItem(constant.USER_ID);
    const url = API_CONSTANT.USER_ORDER;
    const obj = {
      user_id: 1// user_id
    }
    await APIController.getMethod(url, obj).then((response) => {
      console.log(response);
      if(response.state === 'failed') {
        nthis.setState({ animating:false });
        return;
      }
      nthis.setState({ orderList:response.user_order, animating: false });
    })
  }

 profileContainer(){
  const { userName, userMobile } = this.state;
  // // const fullName = (!data.name === false)?(data.name + data.last_name): 'John Smith';
  // // const mobile = (!data.mobile_no === false)?data.mobile_no: '+91-9999988888';
  // console.log(data);
  let url = '';//data.profile_image;
  // if(!url === true && !picPath === false)  {
  //   url = picPath
  // }
  const source = (!url)?require('../public/icons/username.png'):{ uri: url };
  // console.log(source)
  return(
    <View style={styles.profilePic} /* onPress = {()=>{this.openImagePicker(); }}*/ >
        <Image style={{ resizeMode: 'contain', height: 70, width: 70, borderRadius: 35 }} source={source} />
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff', marginTop: 8 }} >{userName}</Text>
        <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff', marginTop: 8 }} >{userMobile}</Text>
        {/* <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff', marginTop: 8 }} >{firstName + ' ' + lastName }</Text>
        <Text style={{ fontSize: 10, fontWeight: '400', color: '#fff' }} >{mobile}</Text> */}
      </View>
  );
}

  orderList() {
    const { orderList, userName, userMobile } = this.state;
    console.log(orderList);
    console.log(orderList.length);
    if(!orderList || orderList.length === 0){
      return(
        <View style = { styles.orderList } >
            <Text>No order found</Text>
          </View>
      )
    }
    return (
      orderList.map((data, index) => {
        return (
          <TouchableOpacity
            style={styles.orderList}
            key={index}
            onPress={() => {
              Actions.OrderDetail({
                orderList: orderList,
                index: index,
                userName: userName,
                userMobile: userMobile
              })
            }}
          >
            <Text>Order Id - {data.order_id}</Text>
            <Text>Item {data.items.length}</Text>
            <Text>{data.total_amount} INR</Text>
          </TouchableOpacity>
        );
      })
    );
  }

  render() {
    const {  animating } = this.state;
    if (animating) {
      return (
        <View style = {{flex: 1, justifyContent:'center', alignItems: 'center'}} >
          <ActivityIndicator animating={true} size="large" color="orange" />
        </View>
      )
    }
    return (
      <ScrollView style={styles.container} >
        {this.profileContainer()}
        {this.orderList()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    backgroundColor: '#d6d6d6',
  },
  orderList: {
    flexDirection:'row',
    backgroundColor:'#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 25
  },
  profilePic: {
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: 'transparent',
    justifyContent:'center',
    alignItems:'center',
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

export default OrderList;
