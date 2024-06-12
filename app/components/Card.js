import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Card({ item }){
    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text style={styles.labelText}>{ item.topic }:</Text>
            </View>
            
            <View style={{ flexDirection: 'row' }}>
                <View style={ { 
                    backgroundColor: '#A9FFA9',
                    ...styles.box 
                    } }
                >
                    <Image 
                        style={styles.flower}
                        source={require('../../assets/images/Easy_Flower.png')}
                    />
                    <Text style={styles.flowerCount}>{ item.conditions.easy }</Text>
                </View>
                <View style={ { 
                    backgroundColor: '#FDFDB2', 
                    ...styles.box 
                    } }
                >
                    <Image 
                        style={styles.flower}
                        source={require('../../assets/images/Medium_Flower.png')}
                    />
                    <Text style={styles.flowerCount}>{ item.conditions.medium }</Text>
                </View>
                <View style={ { 
                    backgroundColor: '#FECEB1', 
                    ...styles.box 
                    } }
                >
                    <Image 
                        style={styles.flower}
                        source={require('../../assets/images/Hard_Flower.png')}
                    />
                    <Text style={styles.flowerCount}>{ item.conditions.hard }</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    label: {
        margin: 5,
    },
    labelText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 20,
    },

    box: {
        borderRadius: 20,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
        height: 70,
    },
    flower: {
        height: 50,
        width: 50,
        marginLeft: 10,
    },
    flowerCount: {
        color: '#333333',
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        marginLeft: 12,
    }
})