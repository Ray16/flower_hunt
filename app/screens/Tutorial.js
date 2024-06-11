import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Tutorial({ navigation }){
    return (
        <View styles={globalStyles.container}>
            <View styles={globalStyles.header}>
                <Ionicons
                    name='chevron-back'
                    size={24}
                    style={{ padding: 10, marginTop: 20}}
                    onPress={() => (navigation.navigate('Settings'))}
                />
            </View>
            <View styles={globalStyles.body}>
                <Text style={globalStyles.title}> This is the Tutorial Page! </Text>
            </View>
        </View>
    )
}