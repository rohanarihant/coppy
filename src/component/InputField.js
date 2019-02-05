import React, { Component } from 'react';

import {
	View,
	Text,
	Image,
	StyleSheet,
	TextInput,
} from 'react-native';

import { TextField } from 'react-native-material-textfield';

class InputField extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			// isFocus: false
		}
	}

	fun() {

	}

	render() {
		// console.log(this.state.isFocus)
		return (
			<View style = {[styles.button, this.props.containerStyle]} >
				{(!this.props.leftIcon === true)?null:<Image style={{width: 25, height: 25, resizeMode:'contain', marginRight:20}} source={this.props.leftIcon} />}
				<TextInput 
				  placeholder={this.props.placeholder}
					tintColor={this.props.highlightColor}
					containerStyle={{ width: (!this.props.width === false) ? this.props.width : 210, height: this.props.height }}
					value={this.props.value}
					autoCapitalize={(this.props.autoCapitalize) ? this.props.autoCapitalize : 'none'}
					labelHeight={15}
					keyboardType={this.props.keyboardType}
					returnKeyType={this.props.returnKeyType}
					secureTextEntry={this.props.secureTextEntry}
					onChangeText={(text) => (!this.props.onChangeText) ? this.fun(text) : this.props.onChangeText(text)}
					multiline={this.props.multiline}
					numberOfLines={this.props.numberOfLines}
					editable={this.props.editable}
					maxLength={this.props.maxLength}
					allowFontScaling={true}
					fontSize={this.props.fontSize}
					onFocus={this.props.onFocus}
					onEndEditing={this.props.onEndEditing}
					onSubmitEditing={this.props.onSubmitEditing}
					autoFocus={this.props.autoFocus}
					style = {[this.props.style]}
					maxLength= {50}
				/>
      </View>
		);
	}
}

const styles = StyleSheet.create({
  button: {
    width: 340,
    height:45,
    backgroundColor:'red',
    borderRadius:60,
    borderWidth:1,
		borderColor:'#d6d6d6',
		flexDirection:'row',
    justifyContent: 'flex-start',
		alignItems:'center',
		paddingHorizontal:10
  }
});

export default InputField;


// <TextField
// 				label={this.props.label}
// 				tintColor={this.props.highlightColor}
// 				containerStyle={{ width: (this.props.width) ? this.props.width : 150, height: this.props.height }}
// 				value={this.props.value}
// 				autoCapitalize={(this.props.autoCapitalize) ? this.props.autoCapitalize : 'none'}
// 				labelHeight={15}
// 				keyboardType={this.props.keyboardType}
// 				secureTextEntry={this.props.secureTextEntry}
// 				onChangeText={(text) => (!this.props.onChangeText) ? this.fun(text) : this.props.onChangeText(text)}
// 				multiline={this.props.multiline}
// 				numberOfLines={this.props.numberOfLines}
// 				editable={this.props.editable}
// 				maxLength={this.props.maxLength}
// 				fontSize={this.props.fontSize}
// 				onFocus={this.props.onFocus}
// 				onEndEditing={this.props.onEndEditing}
// 				onSubmitEditing={this.props.onSubmitEditing}
// 				autoFocus={this.props.autoFocus}
// 			/>