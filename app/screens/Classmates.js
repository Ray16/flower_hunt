import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Classmates({ navigation }){
    const [classmates, setClassmates] = useState([
        { name: 'Aiden' },
        { name: 'Ben' },
        { name: 'Cherin' },
        { name: 'Dominic' },
        { name: 'Ethan' },
        { name: 'Frank' },
        { name: 'George' },
        { name: 'Horace' },
    ])

    return (
        <View style={globalStyles.container}>
            <Text style={ { marginVertical: 15, ...globalStyles.title }}>Steal From Who?</Text>
            <FlatList 
                style={{ width: '85%'}}
                keyExtractor={(item) => item.name}
                data={classmates}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={ {
                            width: '100%',
                            borderWidth: 1,
                            borderRadius: 3,
                            padding: 10,
                            backgroundColor: '#D3F8D3',
                            marginTop: 5,
                            flexDirection: 'row',
                            
                        } }
                        onPress={() => navigation.navigate('Question')}
                    >
                        <Text style={{
                            fontFamily: 'Nunito-Bold',
                            fontSize: 15,
                            marginLeft: 5,
                            flex: 10,
                        }}>{ item.name }</Text>
                        <Ionicons 
                            name='chevron-forward'
                            size={24}
                            style={{ flex: 1 }}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}