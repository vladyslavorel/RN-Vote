import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import {View, Text, StyleSheet} from 'react-native';
import firebaseSDK from '../config/firebaseSDK';

export default class Chat extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: (navigation.state.params || {}).name || 'Chat!'
	});

	state = {
		messages: [],
		location: this.props.navigation.state.params.location,
		time: this.props.navigation.state.params.time
	};

	get user() {
		return {
			name: this.props.navigation.state.params.name,
			email: this.props.navigation.state.params.email,
			avatar: this.props.navigation.state.params.avatar,
			id: firebaseSDK.getUid(),
			_id: firebaseSDK.getUid()
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.eventString}>
					<Text style={styles.username}>
						@{this.user.name}:
					</Text>
					<Text style={styles.comment}>
						Volleyball at <Text style={styles.location}>{this.state.location}</Text>{"\n"}
						at <Text style={styles.time}>{this.state.time}</Text>
					</Text>
				</View>
				<GiftedChat
					messages={this.state.messages}
					onSend={firebaseSDK.send}
					user={this.user}
					alignTop={true}
				/>
			</View>
		);
	}

	componentDidMount() {
		firebaseSDK.refOn(message =>
			this.setState(previousState => ({
				messages: GiftedChat.append(previousState.messages, message)
			}))
		);
	}
	componentWillUnmount() {
		firebaseSDK.refOff();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	eventString: {
		padding: 10
	},
	username: {
		fontSize: 12,
	},
	comment: {
		fontSize: 18,
	},
	location: {
		color:  'blue',
	},
	time: {
		color: 'green',
	}
})