import React, {Component} from 'react';
import { 
  Platform, StyleSheet, Text, View, Image, ImageBackground,
  ActivityIndicator, TouchableOpacity,ScrollView,Dimensions, AsyncStorage
} from 'react-native';
import APIController from '../utils/APIController';
import constant from '../utils/Constants';
import { API_CONSTANT } from "../utils/API";

import { Container, Header, Content, Button,Item,Icon,Input } from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import CustomButton from '../component/button';
const { height, width } = Dimensions.get('window');

export default class Splash extends Component{

  constructor(props) {
    super(props);
    this.state = {
      animating:false
    }
  }

  componentDidMount() {
    // axios.get('https://www.creaseart.com/wtemplate/vendor_order_list.php?vendor_id=17')
    //   .then(res => {
    //     alert(res.vendor_order_list.vendor_order_list.customer_name)
    //     const persons = res.data;
    //     this.setState({ persons });
    //   })
    this.fetchVendorOrders();
  }

  async fetchVendorOrders() {
    const nthis = this;
    const { animating } = this.state;
    this.setState({ animating: true });

    
    const url = API_CONSTANT.NEW_VENDOR_LIST+'?vendor_id=17';
    const obj = {
      user_id: 1// user_id
    }
    await APIController.getMethod(url).then((response) => {
      console.log(response);
      if(response.state === 'failed') {
        nthis.setState({ animating:false });
        return;
      }
      // nthis.setState({ orderList:response.user_order, animating: false });
    })
  }

  orderList() {
    const arr = [{order_id: '001001', address: '225, Lr. Gr. Floor, Haryana', services: 'Dry Clean, 5pc' , type: 'Dispatched' },
    {order_id: '000203', address: 'Sector 31, Noida', services: 'Dry Clean, 3pc' , type: 'Delivered' },
    {order_id: '000035', address: '225, Lr. Gr. Floor, Haryana', services: 'Dry Clean, 58pc' , type: 'Progess' },
    {order_id: '000120', address: 'Sector 31, Noida', services: 'Dry Clean, 9pc' , type: 'New Order' },
    {order_id: '000021', address: '225, Lr. Gr. Floor, Haryana', services: 'Dry Clean, 5pc' , type: 'Cancelled' }]

    let bgcolor = '#DCDCDC';
    let headerTxtcolor = '#fff';
    let txtcolor = '';
    return arr.map((data, index) => {
      return (
        <View style={{ backgroundColor: bgcolor,  marginTop:5 }}>
        <View style={{backgroundColor:'#fff'}}>
          <View style={{ height: 30,backgroundColor: '#B93B35', flexDirection: 'row', padding:5,justifyContent:'space-between'}}>
              <View style={{ justifyContent: 'center'}}> 
              <Text style = {{ color: headerTxtcolor, alignItem:'center' }}><Text style={{ fontWeight: '600', fontSize:14, alignItem:'center'  }}>Rahul</Text></Text>
              </View> 
              <View style={{ justifyContent: 'center'}}>
              <Text style = {{ color: headerTxtcolor }} ><Text style={{ fontWeight: '600',fontSize:14, }}>Order Id-</Text> 586551</Text>
              </View>
              <View style={{ justifyContent: 'center'}}>
              <Text style = {{ color: headerTxtcolor }} ><Text style={{ fontWeight: '600' ,fontSize:14,}}>Date-30/01/2019</Text></Text>
              </View>
          </View>
         <View style={{ backgroundColor: bgcolor,marginBottom:height*0.02,height:height*0.25}} key = {index}>
          <Text style = {[ estyles.dataStyles,{color: txtcolor}]} ><Text style={{ fontWeight: '600' }} >Order Id - </Text> #{data.order_id}</Text>
          <Text style = {[ estyles.dataStyles,{color: txtcolor}]} ><Text style={{ fontWeight: '600' }} >Pickup -</Text>Tue,5 Feb, 10:00 am-12:00 pm</Text>
          <Text style = {[ estyles.dataStyles,{color: txtcolor}]} ><Text style={{ fontWeight: '600' }} >Address -</Text> {data.address}</Text>
          <Text style = {[ estyles.dataStyles,{color: txtcolor}]} ><Text style={{ fontWeight: '600' }} >Services -</Text> {data.services}</Text>
          <View style = {{ flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center' }}>
          {/* <Button  transparent dark>
            <Text style={{color:'red'}}>View Details</Text>
          </Button> */}
          <Text style={{color:'red', marginRight:10, fontWeight:'600'}}>View Details</Text>
            </View>
          </View>
          </View>
        </View>
      );
    })
  }

  orderType(text, bgcolor) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor:bgcolor, padding: 5 }} >
        <Text style={{ fontSize: 12, fontWeight: '600', color:'#fff' }} >{text}</Text>
      </View>
    );
  }
  
  render() {
    return(
      <View style={{ flex: 1, backgroundColor:"#DCDCDC"}} >
        <ScrollView >
        <Header searchBar rounded autoCorrect={false}>
            <Item >
              <Input
              style={{fontSize:12, marginStart:10}}
                placeholder="  Search Order"
                placeholderTextColor="red"
              />
              <Icon style={{color:"red"}} name="ios-search" />
            </Item>
          </Header>
            {this.orderList()}
        </ScrollView>
       
      </View>
    );
  }
}

const estyles = EStyleSheet.create({
  button: {
    backgroundColor:'transparent',
    borderColor:'red',
    marginTop:5,
    marginBottom:5,
    borderRadius:10,
    marginRight:5,
    width: 100,
    height:20,
    alignSelf: 'center'
  },
  textStyle: {
    fontSize: 13,
    fontWeight:'bold',
    color:'red'
  },
  dataStyles:{
    padding:10
  }
})