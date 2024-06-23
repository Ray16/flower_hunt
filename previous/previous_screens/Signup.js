import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';
import { useUser } from '../components/UserContext';

export default function SignUpForm({ navigation }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [existError, setExistError] = useState(false);
	const [errorText, setErrorText] = useState('');

	const { updateState } = useUser();

	const handleSubmit = async () => {
		if(username == "" || password == ""){
			console.log("Ran first validation");

			setExistError(true);
			setErrorText("All fields are required");
			return;
		}

		if(password.length < 8){
			console.log("Ran second validation");

			setExistError(true);
			setErrorText("Password must be at least 8 characters");
			return;
		}

		if(password != confirmPassword){
			console.log("Ran third validation");

			setExistError(true);
			setErrorText("Passwords do not match");
			return;
		}

		setExistError(false);
		setErrorText("");

		console.log("Passing data.... ")

		try {
			const response = await fetch(
				'http://129.114.24.200:8001/create_user', {
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

			if(data.status == "success"){

				updateState( 'userId', data.uid )
            	updateState( 'username', username )
				navigation.navigate('HomeTab')

			} else if(data.status == "already created"){

				setExistError(true);
				setErrorText("Username already taken");

			}

		} catch(error) {
			console.log('Error fetching data: ', error);
		}
	}

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

            {/* password input */}    
            <TextInput
                style={{ width: '75%', ...globalStyles.textInput}}
                placeholder='Password'    
                onChangeText={(val) => setPassword(val)}            
                secureTextEntry={true}
            />

			{/* confirm password input */}    
            <TextInput
                style={{ width: '75%', ...globalStyles.textInput}}
                placeholder='Confirm Password'    
                onChangeText={(val) => setConfirmPassword(val)}            
                secureTextEntry={true}
            />

			{ existError ? (
                <Text style={passwordStyle.incorrect}>
					{ errorText }
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