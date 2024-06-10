import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function About({ navigation }){
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
                <Text style={{alignSelf: 'center', ...globalStyles.title}}> About The Game </Text>
                <Text style={styles.body}>
                    This is a game that deepens your friendship with your classmates by revealing their "secrets". {"\n"}
                </Text>
                <Text style={{ ...styles.body, fontFamily: 'EBG-bold', fontWeight: 'bold'  }}>
                    What To Expect:
                </Text>
                <Text style={styles.body}>
                    1. You need to first complete a quiz (50 questions) about yourself, such as your personal interests, past experience, etc. {"\n"}
                    2. A knowledge garden will be built. Each garden has a number of flowers, each chapter corresponds a given row (4 flowers per row). {"\n"}
                    3. When the game starts, you can hunt for each other's flowers by going to their garden and hunting for flowers, which reveal one secrete about him/her. 
                    When hunting for flowers, you need to answer multiple choice questions related to the course materials, which will be randomly picked by AI. {"\n"}
                </Text>
                <Text style={{ ...styles.body, fontFamily: 'EBG-bold', fontWeight: 'bold'  }}>
                    Rules:
                </Text>
                <Text style={styles.body}>
                    1. You can only hunt for flowers that correspond to a given chapter. {"\n"}
                    2. You cannot hunt for flower if all of the flowers have been hunted. {"\n\n"}
                    Have fun and enjoy learning! 
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        marginHorizontal: 30,
        fontFamily: 'EBG-regular',
    }
})