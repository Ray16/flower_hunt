import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import { useUser } from '../components/UserContext';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordWrong, setIsPasswordWrong] = useState(false);

    const { updateState } = useUser();

    {/* input checking */}
    const handleSubmit = async () => {
        console.log("Username is: ", username);
        console.log("Password is: ", password);
        try {
            const response = await fetch(
                'http://129.114.24.200:8001/login', {
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
            console.log(data);

            if(data.status == "success"){
                
                updateState( 'userId', data.uid )
                updateState( 'username', username )
                setIsPasswordWrong(false)
                navigation.navigate('HomeTab')

            } else if(data.status == 'failed'){
                setIsPasswordWrong(true)
            }
    
        } catch(error) {
            console.log('Error fetching data: ', error);
        }
    };

    return (
        <View style={globalStyles.container}>

            {/* rendering title */}
            <Text style={globalStyles.title}>Welcome to Flower Hunt!</Text> 

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

            { isPasswordWrong ? (
                <Text style={passwordStyle.incorrect}>
                    Invalid username or wrong password
                </Text>
            ) : (
                <View style={passwordStyle.placeholder}></View>
            )}

            {/* login button */}  
            <TouchableOpacity 
                style={globalStyles.button} 
                onPress={() => handleSubmit()}
            >
                <Text style={globalStyles.buttonText}>
                    Login
                </Text>
            </TouchableOpacity>

            {/* sign up option */}    
            <View style={style.container}>
                <Text style={globalStyles.text}>Don't have an account yet?</Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Sign Up')}
                >
                    <Text style={
                        {color: 'blue',
                        textDecorationLine: 'underline',
                        fontFamily: 'Nunito-Regular'
                        }
                    }>Sign Up!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
})

const passwordStyle = StyleSheet.create({
    incorrect: {
        color: 'red',
    },
    placeholder: {
        height: 17,
    }
})