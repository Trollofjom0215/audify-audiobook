import React, { useState , useEffect } from 'react';
import { Button, ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//importing Audio from expo-av library
import {Audio} from 'expo-av';
//importing Permission library to ask for permissions to audio speakers
import { Permissions } from 'expo';


const AudioBook = () =>{

	const [sound,setSound] = useState();


	//declaring an async function ; basically making this function wait for a promise from another async task
	async function playSound() {
		console.log('Loading Sound');

		const url = "https://ipaudio.club/wp-content/uploads/PRIME/Sophie’s%20World/01.mp3?_=1";
		
		//Audio.Sound.createAsync function asynchronously loads the audio specified by the url and return an object with info about loaded audio
		//await keyword ensures code waits for this operating before proceeding.
		// the object deconstructor { sound } is used to retrieve specific 'sound' property from object returned by the function
		const { sound } = await Audio.Sound.createAsync(
				{uri : url}
		);
		//setSound state re-render function is called with 'sound' property as an argument 
		//to re-render the state
		setSound(sound);

		console.log("playing audiobook");
		await sound.playAsync();
	}

	useEffect(()=>{
		//returns a ternary condition operator
		//checks if sound has true or false value
		//if true executes sound.unloadAsync()
		//if false return nothing 'undefined'
		return sound
		? ()=> {
			console.log("unloading Audio");
			//stops playback of the audio and releases system resources 
			sound.unloadAsync();
		}
		: undefined;
	}, [sound]);


	return(
		<View style = {styles.container}>
			<Button title = "Play Audiobook" onPress = {playSound} />
		</View>

	);
}

const styles = StyleSheet.create({
	container : {
		flex : 1,
		justifyContent : 'center' ,
		backgroundColor: '#040404',
		padding: 10,
	},
});

export default AudioBook;

