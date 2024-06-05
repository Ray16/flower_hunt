import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';

export default function Settings({ navigation }){
    return (
        <View style={globalStyles.container}> 
            <Text>
                This is the Settings Page! 
            </Text>
        </View>
    )
}