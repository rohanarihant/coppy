import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

export default class Rider extends Component {

    orderList(){
        const arr = [{
            "name": "Proxima Midnight",
            "email": "proxima@appdividend.com"
        },
        {
            "name": "Ebony Maw",
            "email": "ebony@appdividend.com"
        },
        {
            "name": "Black Dwarf",
            "email": "dwarf@appdividend.com"
        },
        {
            "name": "Mad Titan",
            "email": "thanos@appdividend.com"
        },]
    }
    render() {
      return (
        <View style={styles.container} >
          <Text style={styles.h2text}>
            Black Order
          </Text>
            <FlatList
            data={this.state.users}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
            <View style={styles.flatview}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            }
            keyExtractor={item => item.email}
          />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    h2text: {
      marginTop: 10,
      fontFamily: 'Helvetica',
      fontSize: 36,
      fontWeight: 'bold',
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    },
    name: {
      fontFamily: 'Verdana',
      fontSize: 18
    },
    email: {
      color: 'red'
    }
    
  });