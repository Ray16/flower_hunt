import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = () => {
        if(username == 'Tester' && password == '12345678'){
            navigation.navigate('HomeTab');
        } else {
            console.log('incorrect!');
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Welcome to Flower Hunt!</Text>             
            <TextInput
                style={{ width: '75%', ...globalStyles.textInput}}
                placeholder='Username'
                onChangeText={(val) => setUsername(val)}
            />
            <TextInput
                style={{ width: '75%', ...globalStyles.textInput}}
                placeholder='Password'    
                onChangeText={(val) => setPassword(val)}            
                secureTextEntry={true}
            />
            <View style={style.container}>
                <Text style={globalStyles.text}>Don't have an account yet?</Text>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Sign Up')}
                >
                    <Text style={
                        {color: 'blue',
                        textDecorationLine: 'underline',
                        fontFamily: 'EBG-regular'
                        }
                    }>Sign Up!</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={globalStyles.button} onPress={loginHandler}>
                <Text style={globalStyles.buttonText}>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalClose: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    }
})