import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';

export default function Settings({ navigation }){
    return (
        <View style={globalStyles.container}> 
            <TouchableOpacity 
                onPress={() => navigation.navigate('About')}
                style={styles.redirect}
            >
                <Text style={styles.text}> About </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Tutorial')}
                style={styles.redirect}
            >
                <Text style={styles.text}> Tutorial </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={styles.redirect}
            >
                <Text style={styles.text}> Logout </Text>
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
        fontFamily: 'EBG-bold',
        fontSize: 20,
    }
})

