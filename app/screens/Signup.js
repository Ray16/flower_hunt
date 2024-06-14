import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';
import { useUser } from '../components/UserContext';

export default function SignUpForm({ navigation }) {
	const [profileData, setProfileData] = useState([]);

	const [username, setUsername] = useState('');
	const [userErrorText, setUserErrorText] = useState('');
	const [uw, setUW] = useState(false);

	const [password, setPassword] = useState('');
	const [pw, setPW] = useState(false);

	const [confirmPassword, setConfirmPassword] = useState('');
	const [cpw, setCPW] = useState(false);

	const [trigger, setTrigger] = useState(0);

	const { updateState } = useUser();

	const handleSubmit = () => {
		if(username == ""){ 
			setUW(true); 
			setUserErrorText('This field is required');
		} 
		else { setUW(false); }

		if(password == "" || password.length < 8){ setPW(true); } 
		else { setPW(false); }	
		
		if(confirmPassword != password){ setCPW(true); } 
		else { setCPW(false); }

		if(!(uw && pw && cpw)) { setTrigger(prevTrigger => prevTrigger + 1); }
	}

	const fetchData = async () => {
		try {
			const response = await fetch(
			'http://129.114.24.200:8001/garden/create_user', {
				method: 'POST',
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			}
			);
	
			const data = await response.json();
			setProfileData(data)
	
		} catch(error) {
			console.log('Error fetching data: ', error);
		}
	}

	useEffect(() => {
		setTimeout(fetchData, 10);
		console.log("Data fetched: ", profileData)
		if(profileData.status == 'success'){
			updateState(userId, profileData.uid);
			updateState(username, username);
			navigation.navigate('HomeTab')
		} else if(profileData.status == 'already created'){
			setUserErrorText('Username already taken')
		}
	}, [trigger])

	return (
        <View style={globalStyles.container}>

            {/* rendering title */}
            <Text style={{ marginBottom: 20, ...globalStyles.title }}>Create Your Account</Text> 

            {/* username input */}         
            <TextInput
                style={{ width: '75%', ...globalStyles.textInput}}
                placeholder='Username'
                onChangeText={(val) => setUsername(val)}
            />

			{ uw ? (
                <Text style={passwordStyle.incorrect}>
					{ userErrorText }
                </Text>
            ) : (
                <View style={passwordStyle.placeholder}></View>
            )}

            {/* password input */}    
            <TextInput
                style={{ width: '75%', ...globalStyles.textInput}}
                placeholder='Password'    
                onChangeText={(val) => setPassword(val)}            
                secureTextEntry={true}
            />

			{ pw ? (
                <Text style={passwordStyle.incorrect}>
					Password should be at least 8 characters
                </Text>
            ) : (
                <View style={passwordStyle.placeholder}></View>
            )}

			{/* confirm password input */}    
            <TextInput
                style={{ width: '75%', ...globalStyles.textInput}}
                placeholder='Confirm Password'    
                onChangeText={(val) => setConfirmPassword(val)}            
                secureTextEntry={true}
            />

			{ cpw ? (
                <Text style={passwordStyle.incorrect}>
					Passwords do not match
                </Text>
            ) : (
                <View style={passwordStyle.placeholder}></View>
            )}	

            {/* sign up button */}  
            <TouchableOpacity 
                style={globalStyles.button} 
                onPress={() => handleSubmit()}
            >
                <Text style={globalStyles.buttonText}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
	errorText: {
		fontFamily: 'Nunito-Regular',
        fontSize: 14,
		color: 'red',
		alignSelf: 'center'
	}
})

const passwordStyle = StyleSheet.create({
    incorrect: {
        color: 'red',
    },
    placeholder: {
        height: 17,
    }
})