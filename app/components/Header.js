import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';

export default function Header({ headerText }){
    return (
        <View style={style.header}>
            <View>
                <Text style={globalStyles.title}>{ headerText }</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})