import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebaseSDK from '../config/firebaseSDK';

export default class Login extends React.Component {
	static navigationOptions = {
		title: 'RN Vote'
	};

	state = {
		name: 'Tester',
		email: 'test@gmail.com',
		password: '123456',
		avatar: ''
	};

	onPressLogin = async () => {
		const user = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			avatar: this.state.avatar
		};

		const response = firebaseSDK.login(
			user,
			this.loginSuccess,
			this.loginFailed
		);
	};

	loginSuccess = () => {
		console.log('login successful, navigate to chat.');
		this.props.navigation.navigate('Map', {
			name: this.state.name,
			email: this.state.email,
			avatar: this.state.avatar
		});
	};

	loginFailed = () => {
		alert('Login failure. Please tried again.');
	};

	onChangeTextEmail = email => this.setState({ email });
	onChangeTextPassword = password => this.setState({ password });

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.input}>
					<Text style={styles.title}>Email:</Text>
					<TextInput
						style={styles.nameInput}
						placeHolder="test3@gmail.com"
						onChangeText={this.onChangeTextEmail}
						value={this.state.email}
					/>
					<Text style={styles.title}>Password:</Text>
					<TextInput
						style={styles.nameInput}
						onChangeText={this.onChangeTextPassword}
						value={this.state.password}
					/>	
				</View>
				
				<View style={styles.buttonText}>
					<Button
						title="Login"
						color="green"
						onPress={this.onPressLogin}
					/>
					<Text style={styles.title}></Text>

					<Button
						title="Signup"
						onPress={() => this.props.navigation.navigate('Signup')}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	input: {
		paddingTop: '20%',
		paddingLeft: '20%',
		paddingRight: '20%',
		paddingBottom: '20%'
	},
	title: {
		marginTop: 16,
		marginBottom: 16,
		fontSize: 16
	},
	nameInput: {
		height: 16 * 2,
		paddingHorizontal: 16,
		borderColor: '#111111',
		borderWidth: 1,
		fontSize: 16
	},
	buttonText: {
		paddingLeft: "20%",
		paddingRight: "20%",
		fontSize: 42
	}
});
