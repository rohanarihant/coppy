import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');

import { Container, Header, Content, Button, Text,Left,Icon,Title, Body,Right } from 'native-base';
export default class VendorOrderDetail extends Component {

    render(){
        return(
            <Container>
             <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title >Header</Title>
          </Body>
         <Right></Right>
        </Header>
                {/* <Content> */}
                <View style={styles.container}>
                    <View style={styles.leftDetailColumn}>
                        <Text ><Text style={[styles.detailLeftStyle,styles.constFontSize]}>Order Id -</Text><Text style={styles.constFontSize}>586551</Text></Text>
                        <Text style={[styles.constFontSize,{marginBottom:height*0.025}]}><Text style={[styles.detailLeftStyle,styles.constFontSize,{marginBottom:20}]}>Name -</Text><Text style={styles.constFontSize}> Joe Mac</Text></Text>
                        <Text style={[styles.detailLeftStyle,styles.constFontSize]}>Pickup Time - </Text>
                        <Text style={[styles.detailLeftStyle,styles.constFontSize]}>Delivery Time -</Text>
                        <Text style={[styles.detailLeftStyle,styles.constFontSize]}>Address - </Text>
                        <Text></Text>
                    </View>
                    <View style={styles.rightDetailColumn}>
                        <Text style={[{marginLeft:width*0.1}]}><Text style={[styles.detailLeftStyle,styles.constFontSize]}>Date -  </Text><Text style={styles.constFontSize}>  30/01/2019</Text></Text>
                        <Text style={[{marginLeft:width*0.1,marginBottom:height*0.025}]}><Text style={[styles.detailLeftStyle,styles.constFontSize]}>Phone - </Text><Text style={styles.constFontSize}>+91**********</Text></Text>
                        <Text style={styles.constFontSize}>Tue, 5 Feb, 10:00 am - 12:00 pm</Text>
                        <Text style={styles.constFontSize}>FRI, 8 Feb, 10:00 am - 12:00 pm</Text>
                        <Text style={styles.constFontSize}>99/ A-z Ind Estate, G.K marg, Jacob Circle99</Text>
                    </View>


                    <View style={styles.secondSection}>

                    </View>
                </View>
                   
                {/* </Content> */}
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      flexDirection: 'row',
      backgroundColor: '#F5FCFF', 
      width:width
    },

    leftDetailColumn: {
    //   flex: 1,
    //   margin: 20,
    //   backgroundColor: 'orange',
      marginLeft: width*0.05,
      height:height*0.2,
      width:width*0.35,
      fontSize:7
    },
    rightDetailColumn:{
    //   flex: 1,
    //   margin: 20,
    //   backgroundColor: 'orange',
      marginRight: width*0.05,
      height:height*0.2,
      width:width*0.55,
      
    },
    detailLeftStyle:{
    //   padding:5,
      fontWeight:'bold',
    },
    constFontSize:{
        fontSize: 13
    },
    secondSection:{
        backgroundColor: 'red',
        height:height*0.25,
        border
    }
    
  });