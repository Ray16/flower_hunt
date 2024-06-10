import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function StolenFlower({ navigation }){
    const [stolenInfo, setStolenInfo] = useState({ count: 4, person: 3});
    const [stolenDetails, setStolenDetails] = useState([
        { name: 'Adam', count: '1' },
        { name: 'Ben', count: '2' },
        { name: 'Charlie', count: '3' }
    ])
    let userId = 'Hanlei';

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

                <Text style={{marginTop: 100, ...globalStyles.title}}>
                    Hi {userId}!
                </Text>
                <Text style={globalStyles.text}>
                    You have stolen {stolenInfo.count} flowers from {stolenInfo.person} people!
                </Text>
                <Text style={globalStyles.text}>
                    Specifically, you have stolen:
                </Text>
                <FlatList
                        data={stolenDetails}
                        keyExtractor={(item) => item.name}
                        renderItem={({item}) => (
                            <Text style={styles.list}>{ item.count } from { item.name } </Text>
                    )}
                />
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    body: {
      flex: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    list: {
        fontFamily: 'EBG-regular',
        fontsize: 15,
        padding: 2,
    }
})