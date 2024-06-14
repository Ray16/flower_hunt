import React, { useState } from 'react';
import { Image, Text, View } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import { useUser } from '../components/UserContext';
import ProgressBar from '../components/ProgressBar';

export default function Home(){
    const { userState } = useUser();

    return (
        <View style={globalStyles.container}> 
            <View style={globalStyles.header}>
                <Text style={globalStyles.title}> Welcome, { userState.username }! </Text>
            </View>
            <View style={globalStyles.body}>
                <Image 
                    source={require('../../assets/images/home_flower.png')}
                    style={{ marginTop: 5, height: '30%' }}
                />
                <Text style={{ 
                    alignSelf: 'center', 
                    marginTop: 20, 
                    ...globalStyles.title
                }}> 
                    Become An Experienced Learner!
                </Text>
                
            </View>
        </View>

    )
}