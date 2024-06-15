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
                This app is designed to help you: {"\n\n"}
                1) Consistently review your LeetCode questions, {"\n"}
                2) Learn from others' study plans. {"\n\n"}
                Start with an empty garden and plant flowers by solving corresponding questions. Explore your classmates’ gardens and "steal" their knowledge by solving the same problems. {"\n\n"}
                
                Struggling with certain topics? Our AI (Baidu Qianfan AppBuilder) analyzes your study habits and generates questions based on your expertise. Enjoy learning in a fun, interactive way!
                </Text>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        marginHorizontal: 30,
        fontFamily: 'Nunito-Regular',
    }
})