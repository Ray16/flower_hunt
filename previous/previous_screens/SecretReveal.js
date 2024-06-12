import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Secrets({navigation}) {
    const [secrets, setSecrets] = useState([
        { key: '1', name: 'Aiden', num: '1' },
        { key: '2', name: 'Ben', num: '2' },
        { key: '3', name: 'Charlie', num: '1' },
    ])

    return (
        <View style={globalStyles.container}>
            <View style={styles.header}>
                <Ionicons
                name='chevron-back'
                size={24}
                style={{flex: 1}}
                onPress={() => (navigation.navigate('Garden'))}
                />
            </View>
            <View style={styles.body}>
                <Text style={{marginTop: 100, ...globalStyles.title}}>Stolen Secrets:</Text>
                <FlatList
                    data={secrets}
                    renderItem={({item}) => (
                        <View>
                            <Text style={styles.title}>{ item.name }:</Text>
                            <Text>You have {item.num} secrets from them!</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 20,
    },
    title: {
        fontFamily: 'EBG-bold',
        fontSize: 18,
    }
})