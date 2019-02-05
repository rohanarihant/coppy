import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import ModalWrapper from 'react-native-modal-wrapper';

var nthis = '';
export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    nthis = this;
    this.state = {
      isFilterByTagPanelOpen: false,
    }
  }

  modalWrapper() {
    const { isLoggedIn, userName, userEmail } = this.state;
    return (
      <ModalWrapper
        containerStyle={estyles.modal}
        onRequestClose={() => this.setState({ isFilterByTagPanelOpen: false })}
        position="left"
        style={{ width: 270, backgroundColor: 'rgba(0,0,0,0.5)' }}
        visible={this.state.isFilterByTagPanelOpen}>
        <View style={estyles.modalContainer} >
          <View style={estyles.imageContainer}>
            <TouchableOpacity onPress={() => { }} >
              <View style={estyles.modalSubContainer}>
                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: '600', color: '#363636' }} >Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{ margin: 20 }}>

              <TouchableOpacity onPress={() => { this.setState({ isFilterByTagPanelOpen: false }); Actions.Splash() }} >
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#363636' }} >Add Products</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 20 }} onPress={() => {  alert('hey') }} >
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#363636' }} >My Products</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ModalWrapper>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <View style={estyles.container} >
        {
          this.modalWrapper()
        }
        <Text style = {{marginTop: 50}} onPress={() => { this.setState({ isFilterByTagPanelOpen: true }) }}  >press here</Text>
        <View style={{ margin: 10, }} >
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#363636', textAlign: 'center' }} >User Details</Text>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#363636', marginTop: 10 }} >Name : </Text>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#363636', marginTop: 10 }} >Email : </Text>
        </View>
      </View>
    );
  }
}

const estyles = EStyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  modal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    width: '100%',
    height: "100%",
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    height: '12%',
    backgroundColor: '#005596'
  },
  modalSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingLeft: 20,
  },
})