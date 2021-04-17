import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import MapPicker from "react-native-map-picker";

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.navigation.state.params.name,
            email: props.navigation.state.params.email,
            avatar: props.navigation.state.params.avatar,
            location: '',
            time: '',
            date: null,
            isDateTimePickerVisible: false
        };
    }

    static navigationOptions = ({ navigation }) => ({
		title: "Select Location and Time"
	});

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };
    
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.setState({
            date: date,
            time: date.toString()
        })
        this.hideDateTimePicker();
    };

    selectLocation = (latitude, longitude) => {
        const myApiKey = 'AIzaSyB2YeMKniOp8PvU2qPj99m7LTedKOEGYUM';
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&location_type=ROOFTOP&result_type=street_address&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            const address = responseJson.results[0].formatted_address;
            this.setState({location: address})
        })
    }

    onPressCreateEvent = () => {
        this.props.navigation.navigate('Chat', {
			name: this.state.name,
			email: this.state.email,
            avatar: this.state.avatar,
            location: this.state.location,
            time: this.state.time
		});
        console.log("createEvent", this.state.location, this.state.date)
    }

	render() {
		return (
			<View style={styles.container}>
                {/* <MapView
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421 
                    }}
                /> */}
                <MapPicker
                    style={styles.map}
                    initialCoordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    onLocationSelect={({latitude, longitude})=>this.selectLocation(latitude, longitude)}
                />
                <View style={styles.inline}>
                    <Text style={styles.title}>Location:</Text>
                    <TextInput
                        style={styles.location}
                        placeholder = "Location..."
                        multiline={true}
                        editable={false}
                        // onChangeText={(location)=>this.setState({location})}
                        value={this.state.location}
                    />
                </View>
                <View style={styles.inline}>
                    <Text style={styles.title}>Time:</Text>
                    <TouchableOpacity onPress={this.showDateTimePicker}>
                        <TextInput
                            style={styles.time}
                            placeholder = "Date/Time..." 
                            editable={false}
                            value={this.state.time}
                        />
                    </TouchableOpacity>
                    
                    <DateTimePicker
                        mode="datetime"
                        locale="en_GB"
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </View>
                
				<Button
					title="Create Event"
					style={styles.buttonText}
					onPress={this.onPressCreateEvent}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: 600,
        height: 400
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    title: {
        color: 'red',
        width: '20%',
		marginLeft: '2%',
		fontSize: 16
    },
    location: {
        width: '78%',
        padding: 10,
        fontSize: 16
    },
    time: {
        width: '78%',
        padding: 10,
        fontSize: 16
    },
    buttonText: {
        marginBottom: 10,
        marginLeft: 16,
		fontSize: 42
    }
});
