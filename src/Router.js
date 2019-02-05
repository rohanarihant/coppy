import React, { Component } from 'react';
import {
  View,
  Platform,
} from 'react-native';
import { Icon } from 'native-base';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Scene, Router, Stack, Tabs, Drawer, Actions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/Ionicons';
import VectorIcon from 'react-native-vector-icons/FontAwesome';

import Splash from './screen/Splash';
import Login from './screen/Login';
import Test from './screen/SideMenu';
import VendorHomePage from './screen/VendorHomePage';
import MyProfile from './screen/MyProfile';
import EditProfile from './screen/EditProfile';
import AboutCreaseArt from './screen/AboutCreaseArt';
import Feedback from './screen/Feedback';
import OrderList from './screen/OrderList';
import OrderDetail from './screen/OrderDetail';

import DefaultProps from './constants/navigation';

import { HomeContainer, ProfileContainer, SearchContainer } from './container';
import HomeSidemenu from "./SideMenu/HomeSidemenu";
import VendorSideMenu from "./SideMenu/VendorSideMenu";
import VendorOrderDetail from './screen/VendorOrderDetail';

EStyleSheet.build({
  $textColor: 'green'
});

const TabIcon = ({ title, focused }) => {
  switch (title) {
    case 'HOME':
      return (
        <Icon
          name="home"
          style={focused ? DefaultProps.selectedIcon : DefaultProps.unselectedIcon}
        />
      );

    case 'SEARCH':
      return (
        <Icon
          name="search"
          style={focused ? DefaultProps.selectedIcon : DefaultProps.unselectedIcon}
        />
      );

    case 'PROFILE':
      return (
        <Icon
          name="person"
          style={focused ? DefaultProps.selectedIcon : DefaultProps.unselectedIcon}
        />
      );

    case 'CART':
      return (
        <Icon
          name="cart"
          style={focused ? DefaultProps.selectedIcon : DefaultProps.unselectedIcon}
        />
      );


    case 'default':
      return <Icon />;
  }
};

export default class Navigator extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: (Platform.OS == 'ios') ? 0 : 0 }}>
        <Router>
          <Scene key="main">
            <Scene key="Splash" component={Splash} hideNavBar={true} />
            <Scene key="Login" component={Login} hideNavBar={true} initial={false} />
            <Scene key="Test" component={Test} hideNavBar={true} />
            <Scene key="VendorOrderDetail" component={VendorOrderDetail} hideNavBar={true} initial/>
            <Drawer
              hideNavBar
              key="drawer"
              onExit={() => {
                console.log('Drawer closed');
              }}
              onEnter={() => {
                console.log('Drawer opened');
              }}
              contentComponent={HomeSidemenu}
              drawerIcon={<Icon name={"menu"} />}
              drawerWidth={300}
              initial={false}
            >
              <Scene hideNavBar  >
                <Tabs
                  key="tabbar"
                  swipeEnabled
                  tabBarPosition="bottom"
                  showLabel={false}
                  {...DefaultProps.tabProps}
                >
                  <Stack
                    key="Home"
                    title="HOME"
                    icon={TabIcon}
                    {...DefaultProps.navbarProps}
                  >
                    <Scene key="HomeLanding" component={HomeContainer} />
                  </Stack>

                  <Stack
                    key="Search"
                    title="SEARCH"
                    icon={TabIcon}
                    {...DefaultProps.navbarProps}
                  >
                    <Scene key="SearchLanding" component={SearchContainer} />
                  </Stack>

                  {/* <Stack
                    key="Profile"
                    title="PROFILE"
                    icon={TabIcon}
                    {...DefaultProps.navbarProps}
                  >
                    <Scene key="ProfileLanding" component={ProfileContainer} />
                  </Stack> */}

                 
                </Tabs>
              </Scene>
            </Drawer>
            <Drawer
              hideNavBar
              key="VendorDrawer"
              onExit={() => {
                console.log('Drawer closed');
              }}
              onEnter={() => {
                console.log('Drawer opened');
              }}
              contentComponent={VendorSideMenu}
              drawerIcon={<Icon name={"menu"} />}
              drawerWidth={300}
              initial={false}
            >
              <Scene key="VendorHomePage" component={VendorHomePage} hideNavBar={false} />
            </Drawer>
            <Scene
              key="MyProfile"
              component={MyProfile}
              hideNavBar={false}
              title='My Profile'
              onRight={() => { Actions.EditProfile() }}
              rightButtonImage={require('./public/icons/edit.png')}
              initial={false}
            />
            <Scene
              left={null}
              key="EditProfile"
              component={EditProfile}
              hideNavBar={false}
              title='Edit Profile'
              onRight={() => { Actions.pop(); setTimeout(() => { Actions.refresh({ someProp: 'someValue' }); }, 0); }}
              rightButtonImage={require('./public/icons/close.png')}
              initial={false}
            />
           
            <Scene
              key="AboutCreaseArt"
              title={'AboutCreaseArt'}
              component={AboutCreaseArt}
              hideNavBar={false}
              initial={false}
            />
            <Scene
              key="Feedback"
              component={Feedback}
              hideNavBar={false}
              title='Feedback'
              // onRight={() => { Actions.pop(); setTimeout(() => { Actions.refresh({ someProp: 'someValue' }); }, 0); }}
              // rightButtonImage={require('./public/icons/close.png')}
              initial={false}
            />
            <Scene
              key="OrderList"
              component={OrderList}
              hideNavBar={false}
              title='Order List'
              // onRight={() => { Actions.pop(); setTimeout(() => { Actions.refresh({ someProp: 'someValue' }); }, 0); }}
              // rightButtonImage={require('./public/icons/close.png')}
              initial={false}
            />
            <Scene
              key="OrderDetail"
              component={OrderDetail}
              hideNavBar={false}
              title='Order Detail'
              // onRight={() => { Actions.pop(); setTimeout(() => { Actions.refresh({ someProp: 'someValue' }); }, 0); }}
              // rightButtonImage={require('./public/icons/close.png')}
              initial={false}
            />
          </Scene>
        </Router>
      </View>
    );
  }
}


const estyles = EStyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    top: 10,
    height: '7%',
    opacity: 10,
    borderBottomColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  scene: {
    marginTop: '11%'
  },
  lineOn: {
    width: 100,
    marginTop: 3,
    backgroundColor: '#235162',
    height: (Platform.OS === 'ios') ? 3 : 10
  },
  lineOff: {
    width: '100%',
    marginTop: 5,
    backgroundColor: '#D7D7D7',
    height: 10
  },
  head: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,

  },
  contain: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
