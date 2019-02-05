import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import Navigator from './Router';
import Store from '../src/store/configureStore';

class App extends Component {

    store = Store;

    render() {
        return (
            <Provider store={this.store}>
                <View style={{ flex: 1 }}>
                    <Navigator  />
                </View>
            </Provider>
        );
    }
}

export default App;
