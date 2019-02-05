import React from 'react';
import { View, StyleSheet, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import {
  Container, List, Content, Thumbnail,
  ListItem,
  Icon,
  Text,
} from 'native-base'

import { Actions } from 'react-native-router-flux';
import constant from '../utils/Constants';

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userMobile: ''
    }
  };

  async componentDidMount() {
    const { userName, userMobile } = this.state;
    const name = await AsyncStorage.getItem(constant.USER_NAME);
    const mobile = await AsyncStorage.getItem(constant.USER_MOBILE);
    console.log(name)
    this.setState({ userName: name, userMobile: mobile });
  }

  signOut() {
    Alert.alert(
      'Sign out',
      'Do you want to sign out?',
      [
        { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: async () => { await AsyncStorage.clear(); Actions.Splash(); setTimeout(() => { Actions.refresh({ someProp: 'someValue' }); }, 0); } },
      ],
      { cancelable: false }
    )
  }

  render() {
    const { userName, userMobile } = this.state;
    const name = (!userName) ? 'User Name' : userName;
    const mobile = (!userMobile)?'+91-999999999': userMobile
    return (
      <Container>
        <Content style={{ backgroundColor: '#B93B35' }}>
          <List style={{ marginTop: 40 }}>
            <View style={{ marginBottom: 10, flexDirection: 'row', padding: 20 }}>
              <Thumbnail source={require('../public/icons/username.png')} />
              <View style={{ marginLeft: 18, justifyContent: 'flex-start', justifyContent: 'center', }}>
                <Text style={{ color: '#ffffff', fontSize: 18, textAlign: 'left' }}>{name}</Text>
                <Text style={{ color: '#666465', fontSize: 14 }}>{mobile}</Text>
              </View>
            </View>
            <ListItem iconLeft >
              <Text style={{ marginLeft: 10, color: '#666465' }}>Menu</Text>
            </ListItem>
            <TouchableOpacity iconLeft style={{ flexDirection: 'row', padding: 13, paddingLeft: 33 }} onPress={() => { alert('Dashboard') }} >
              <Icon name="home" style={{ color: '#ffffff', fontSize: 20 }} />
              <Text style={{ marginLeft: 10, color: 'white' }}>Dashboard</Text>
            </TouchableOpacity>
            <View iconLeft style={{ flexDirection: 'row', padding: 13, paddingLeft: 33 }}>
              <Icon name="cart" style={{ color: '#ffffff', fontSize: 20 }} />
              <Text style={{ marginLeft: 10, color: 'white' }}>Order List</Text>
            </View>
            <View iconLeft style={{ flexDirection: 'row', padding: 13, paddingLeft: 33 }}>
              <Icon name="card" style={{ color: '#ffffff', fontSize: 20 }} />
              <Text style={{ marginLeft: 10, color: 'white' }}>Profile</Text>
            </View>
            <View iconLeft style={{ flexDirection: 'row', padding: 13, paddingLeft: 33 }}>
              <Icon name="person" style={{ color: '#ffffff', fontSize: 20 }} />
              <Text style={{ marginLeft: 10, color: 'white' }}>Manage Rider</Text>
            </View>
           
            <View iconLeft style={{ flexDirection: 'row', padding: 13, paddingLeft: 33 }}>
              <Icon name="settings" style={{ color: '#ffffff', fontSize: 20 }} />
              <Text style={{ marginLeft: 10, color: 'white' }}>Payments & Invoices</Text>
            </View>

            <TouchableOpacity iconLeft style={{ flexDirection: 'row', padding: 13, paddingLeft: 33 }} onPress={() => { this.signOut() }} >
              <Icon name="log-out" style={{ color: '#ffffff', fontSize: 20 }} />
              <Text style={{ marginLeft: 10, color: 'white' }}>Logout</Text>
            </TouchableOpacity>

          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
  },

});