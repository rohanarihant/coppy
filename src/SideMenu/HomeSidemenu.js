import React from 'react';
import { View, StyleSheet, TouchableOpacity, AsyncStorage, Modal, ActivityIndicator, Alert } from 'react-native';
import { Container,List,   Content,Thumbnail,
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
            visible: false,
            userName: '',
            userMobile: '',
        }
    };

    async componentDidMount() {
        const { userName, userMobile } = this.state;
        const name = await AsyncStorage.getItem(constant.USER_NAME);
        const mobile = await AsyncStorage.getItem(constant.USER_MOBILE);
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
        const { visible , userName, userMobile} = this.state;
        const name = (!userName)?'User Name': userName;
        const mobile = (!userMobile)?'+91-999999999': userMobile
        return (
            <Container>
                <Content style={{ backgroundColor: '#353334' }}>
                    <List style={{ marginTop: 40 }}>
                        <View style={{marginBottom: 10, flexDirection: 'row',  padding:20}}>
                            <Thumbnail source={require('../public/icons/userimage.gif')} />
                            <View style={{ marginLeft: 20, justifyContent:'flex-start', justifyContent:'center', }}>
                            <Text style={{ color: '#ffffff', fontSize:21 , textAlign:'left'}}>{name}</Text>
                            <Text style={{ color: '#666465', fontSize:14 }}>{mobile}</Text>
                            </View>
                        </View>
                        <ListItem iconLeft >
                            <Text style={{ marginLeft: 10, color:'#666465'}}>Menu</Text>
                        </ListItem>
                        <TouchableOpacity iconLeft style={{flexDirection:'row', padding: 13, paddingLeft: 33}} onPress = {() => { Actions.MyProfile() }} >
                            <Icon name="person" style={{ color: '#ffffff', fontSize:20 }} />
                            <Text style={{ marginLeft: 10, color:'white'}}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity iconLeft style={{flexDirection:'row',padding: 13, paddingLeft: 33}} onPress = {() => { Actions.OrderList() }} >
                            <Icon name="cart" style={{ color: '#ffffff', fontSize:20 }} />
                            <Text style={{ marginLeft: 10, color:'white'}}>Orders</Text>
                        </TouchableOpacity>
                        <TouchableOpacity iconLeft style={{flexDirection:'row', padding: 13, paddingLeft: 33}} onPress = {() => Actions.AddressList()} >
                            <Icon name="home" style={{ color: '#ffffff', fontSize:20 }} />
                            <Text style={{ marginLeft: 10, color:'white'}}>Manage Address</Text>
                        </TouchableOpacity>
                        <ListItem iconLeft>
                            <Text style={{ marginLeft: 10, color:'#666465'}}>Settings</Text>
                        </ListItem>
                        <View iconLeft style={{flexDirection:'row', padding: 13, paddingLeft: 33}}>
                            <Icon name="settings" style={{ color: '#ffffff', fontSize:20 }} />
                            <Text style={{ marginLeft: 10, color:'white'}}>Account Settings</Text>
                        </View>
                        <View iconLeft style={{flexDirection:'row', padding: 13, paddingLeft: 33}}>
                            <Icon name="card" style={{ color: '#ffffff', fontSize:20 }} />
                            <Text style={{ marginLeft: 10, color:'white'}}>Manage Payment</Text>
                        </View>

                        <TouchableOpacity iconLeft style={{flexDirection:'row', padding: 13, paddingLeft: 33}} onPress = {()=>{ this.signOut() }}>
                            <Icon name="log-out" style={{ color: '#ffffff', fontSize:20 }} />
                            <Text style={{ marginLeft: 10, color:'white'}}>Sign out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity iconLeft style={{flexDirection:'row', padding: 13, paddingLeft: 33}} onPress = {()=> { Actions.Feedback() }} >
                            <Icon name="text" style={{ color: '#ffffff', fontSize:20 }} />
                            <Text style={{ marginLeft: 10, color:'white'}}>Send Feedback</Text>
                        </TouchableOpacity>
                        <TouchableOpacity iconLeft style={{flexDirection:'row', padding: 13, paddingLeft: 33}} onPress = {()=> { Actions.AboutCreaseArt() }} >
                            <Icon name="paper" style={{ color: '#ffffff', fontSize:20 }} />
                            <Text style={{ marginLeft: 10, color:'white'}}>About CreaseArt</Text>
                        </TouchableOpacity>
                        <View iconLeft style={{flexDirection:'row', padding: 13, paddingLeft: 33}}>
                            <Icon name="star" style={{ color: '#ffffff', fontSize:20 }} />
                            <Text style={{ marginLeft: 10, color:'white'}}>Rate us on the app store</Text>
                        </View>
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