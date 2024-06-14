import React from 'react';
import { StyleSheet, Text, ImageBackground, View } from 'react-native';

export default function SunlightBar({ sunlight }){
    return (
        <View style={sunlightStyle.container}>
            <ImageBackground
                source={require('../../assets/sprites/top_right_sunlight.png')}
                style={sunlightStyle.bar}
            >
                <Text style={sunlightStyle.text}>
                    { sunlight }
                </Text>
            </ImageBackground>
        </View>
    )
}

const sunlightStyle = StyleSheet.create({
    container: {
        height: 80,
        width: 170,
    },
    bar: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },
    text: {
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
        color: 'white',
        marginLeft: 65,
        marginTop: 26,
        marginRight: 33,
    }
})