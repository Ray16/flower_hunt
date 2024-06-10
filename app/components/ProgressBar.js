import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

export default function ProgressBar( { progress, width } ){
    return (
        <View style={styles.barContainer(width)}>
            <View style={styles.rectangle(progress, width)}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    barContainer: (width) => ({
        width: width,
        height: 10,
        backgroundColor: '#cce7c9',
        borderRadius: 2,
        alignItems: 'flex-start',
    }),
    rectangle: (progress, width) => ({
        width: width*progress,
        height: 10,
        borderRadius: 4,
        backgroundColor: '#5bb450'
    })
})