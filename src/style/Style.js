// Bring in StyleSheet abstraction from React Native
import {
    StyleSheet,Dimensions
  } from 'react-native';
  const { height, width } = Dimensions.get('window');
  // Declare a var/const that is the StyleSheet abstraction
  const styles = StyleSheet.create({
    // All the style content goes here, I've only included one 'class'
    rightNavContainer: {
      flex: 1
    },
    subContainer_1: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      subContainer_2: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        paddingTop: '5%',
        position: 'absolute'
      },
      logo: {
        height: '100%',
        width: '100%',
        resizeMode: 'center',
      },
      image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
      },
      subContainer1: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      subContainer2: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        paddingTop: '5%',
        position: 'absolute'
      },
      subContainer3: {
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingTop: '10%',
      },
      selectUserType: {
        height: 50,
        width: 120,
        borderRadius: 40,
        alignItems:'center',
        justifyContent: 'center'
      },
      selectedSection:{
        width:width/2,
        height: 50,
        backgroundColor:'#fff',
        justifyContent:'center'
      },
      unselectedSection:{
        width:width/2,
        height: 50,
        backgroundColor:'#000',
        justifyContent:'center',
        color:'#fff'
      }
  });
  // !!!Important!!! This makes styles available as an export
  module.exports = styles;