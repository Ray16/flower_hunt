import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';

export default function StealInfo({ userId, week }){
    const [stolenUsers, setStolenUsers] = useState([
        { name: 'Adam', count: 1 },
        { name: 'Ben', count: 2 },
        { name: 'Charlie', count: 3 },
        { name: 'Dominic', count: 1 },
        { name: 'Eve', count: 1 },
        { name: 'Fiona', count: 1 },
    ])

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Hi { userId }!</Text>
            <Text style={globalStyles.text}>The following are the users you have stolen from in week { week}: </Text>
            <FlatList 
                data={stolenUsers}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.count} from {item.name}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={true}
                style={{ flex: 1, paddingHorizontal: 10 }}
            />
        </View>
    )
}