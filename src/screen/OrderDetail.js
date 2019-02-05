
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
  Image
} from 'react-native';

// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { Sae } from 'react-native-textinput-effects';

import moment from 'moment';

import Button from '../component/button';
import APIController from '../utils/APIController';
import constant from '../utils/Constants';
import { API_CONSTANT } from "../utils/API";
import { Actions } from 'react-native-router-flux';

class OrderDetail extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.orderList);
    this.state = {
      animating: false,
      orderList: this.props.orderList,
      index: this.props.index,
      userName: this.props.userName
    }
  }

  async componentDidMount() {
    const nthis = this;
    // const { orderList, orderList, index, userName } = this.state;
    // const userEmail = await AsyncStorage.getItem(constant.USER_EMAIL);
    // this.setState({ email: userEmail });

  }

  profileContainer() {
    const { userName, userMobile, orderList, index } = this.state;
    let url = '';//data.profile_image;
    // if(!url === true && !picPath === false)  {
    //   url = picPath
    // }
    console.log(orderList);
    const source = (!url) ? require('../public/icons/username.png') : { uri: url };
    // console.log(source)
    const data = orderList[index];
    console.log(data);
    return (
      <View style={styles.profilePic} /* onPress = {()=>{this.openImagePicker(); }}*/ >
        <Image style={{ resizeMode: 'contain', height: 70, width: 70, borderRadius: 35 }} source={source} />
        <Text style={{ fontSize: 18, fontWeight: '500', color: 'red', marginTop: 8 }} >{userName}</Text>
        <Text style={{ fontSize: 15, fontWeight: '400', marginTop: 5 }} >Order Id- #{data.order_id}</Text>
        {/* <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff', marginTop: 8 }} >{firstName + ' ' + lastName }</Text>
        <Text style={{ fontSize: 10, fontWeight: '400', color: '#fff' }} >{mobile}</Text> */}
      </View>
    );
  }

  middleContainer() {
    const { orderList, index } = this.state;
    console.log(orderList[index].items);
    return (
      <View style={{ alignItems: 'center' }} >
        <Text style={{ color: 'red', paddingVertical: 10, fontWeight: '500', fontSize: 17 }} >Order Summery</Text>
        <View style={styles.itemList} >
          <Text>Item 1</Text>
          <Text>1 pc</Text>
          <Text>120 INR</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }} >
          <View style={{ alignItems: 'center' }}>
            <View style={styles.circle} ></View>
            <Text style={{ fontSize: 12 }} >In Progress</Text>
          </View>
          <View style={[styles.line, { marginBottom: 15 }]} />
          <View style={{ alignItems: 'center' }}>
            <View style={styles.circle} ></View>
            <Text style={{ fontSize: 12 }} >Despatch</Text>
          </View>
          <View style={[styles.line, { marginBottom: 15 }]} />
          <View style={{ alignItems: 'center' }}>
            <View style={[styles.circle, { backgroundColor: "#fff" }]} ></View>
            <Text style={{ fontSize: 12 }} >Delivered</Text>
          </View>
        </View>
      </View>
    );
  }

  showOrderHistory() {
    const { orderList, index } = this.state;
    const data = orderList[index];
    return (
      <View style={styles.itemList2} >
        <View style={{ width: '38%' }} ><Text>Order #{data.order_id}</Text></View>
        <View style={{ width: '30%' }} ><Text>{moment(data.order_date).format('DD/MM/YYYY') }</Text></View>
        <View style={{ width: '30%', alignItems: 'center' }} ><Text>{data.items.length} pc</Text></View>
      </View>

    );
  }

  lowerContainer() {
    return (
      <View style={{}} >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 15 }} >
          <View style={[styles.line, { marginBottom: 0, width: 150, backgroundColor: "#a6a6a6" }]} />
          <Text>User History</Text>
          <View style={[styles.line, { marginBottom: 0, width: 150, backgroundColor: '#a6a6a6' }]} />
        </View>
        {this.showOrderHistory()}
        <Button
          style={styles.button}
          textStyle={styles.textStyle}
          text='Back to Order List'
          loderCoder={'white'}
          onPress={() =>{ Actions.pop() }}
        />
      </View>
    );
  }

  render() {
    const { animating } = this.state;
    return (
      <ScrollView style={styles.container} >
        {this.profileContainer()}
        {this.middleContainer()}
        {this.lowerContainer()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profilePic: {
    paddingTop: 18,
    paddingBottom: 20,
    backgroundColor: '#d6d6d6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemList: {
    flexDirection: 'row',
    backgroundColor: '#d6d6d6',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    width: 300
  },
  itemList2: {
    flexDirection: 'row',
    backgroundColor: '#a6a6a6',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 15,
    marginTop:4
  },
  circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red'
  },
  line: {
    width: 20,
    height: 1.5,
    backgroundColor: 'red',
    marginHorizontal: 8,
    // marginBottom: 15
    // paddingBottom:5,
  },
  button: {
    backgroundColor:'red',
    borderColor:'red',
    marginTop:15,
    marginBottom:20,
    borderRadius:10,
    width: 140,
    height:30,
    alignSelf: 'center'
  },
  textStyle: {
    fontSize: 13,
    fontWeight:'bold'
  }
});

export default OrderDetail;
