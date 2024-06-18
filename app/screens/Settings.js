import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import { useUser } from '../components/UserContext';

export default function Settings({ navigation }){
    const { userState } = useUser();

    const handleDelete = async () => {
        try {
            const response = await fetch(
                'http://129.114.24.200:8001/delete_account', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  uid: userState.userId,
                }),
              }
            )

            const data = response.json();
            console.log(data)
        } catch(error) {
            console.log('Error fetching data: ', error);
        } finally {
            navigation.navigate('Login');
        }
    }

    const alertDelete = () => {
        Alert.alert('Warning!', 'Are you sure you want to delete your account?', [
            {
                text: 'No',
            },
            {
                text: 'Yes',
                onPress: () => handleDelete(),
            },
        ]
        )
    }

    const createTwoButtonAlert = () =>
        Alert.alert('Alert Title', 'My Alert Msg', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);

    return (
        <View style={globalStyles.container}> 

            <TouchableOpacity 
                onPress={() => navigation.navigate('About')}
                style={styles.redirect}
            >
                <Text style={styles.text}> About </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={styles.redirect}
            >
                <Text style={styles.text}> Logout </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => alertDelete()}
                style={styles.redirect}
            >
                <Text style={styles.text}> Delete Account </Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    redirect: {
        padding: 10,
        marginVertical: 10,
    },
    text: {
        color: '#38CB82',
        fontWeight: 'bold',
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
    }
})

