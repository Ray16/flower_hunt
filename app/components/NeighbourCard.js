import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';

export default function NeighbourCard({ item, iconHandler, course_id, neighbour_id }){
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.labelText}>{ item.topic }:</Text>
            </View>
            
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={ styles.box }
                    onPress={() => iconHandler(course_id, item.topic, "easy", neighbour_id, item.conditions.easy)}
                >
                    <ImageBackground 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            alignItems: 'center',
                        }}
                        source={require('../../assets/sprites/grass_01.png')}
                    > 
                        { item.conditions.easy != 0 ? 
                        (
                            <Image 
                                style={ styles.plant }
                                source={require('../../assets/sprites/plant_01.png')}
                            />
                        ) : ( 
                            <View style={ styles.plant }></View>
                        ) }
                        <Text style={styles.flowerCount}>{ item.conditions.easy }</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    style={ styles.box }
                    onPress={() => iconHandler(course_id, item.topic, "medium", neighbour_id, item.conditions.medium)}
                >
                    <ImageBackground 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            alignItems: 'center',
                        }}
                        source={require('../../assets/sprites/grass_02.png')}
                    >
                        { item.conditions.medium != 0 ? 
                        (
                            <Image 
                                style={ styles.plant }
                                source={require('../../assets/sprites/plant_02.png')}
                            />
                        ) : ( 
                            <View style={ styles.plant }></View>
                        ) }
                        <Text style={styles.flowerCount}>{ item.conditions.medium }</Text>
                    </ImageBackground>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={ styles.box }
                    onPress={() => iconHandler(course_id, item.topic, "hard", neighbour_id, item.conditions.hard)}
                >
                    <ImageBackground 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            alignItems: 'center',
                        }}
                        source={require('../../assets/sprites/grass_03.png')}
                    >
                        { item.conditions.hard != 0 ? 
                        (
                            <Image 
                                style={ styles.plant }
                                source={require('../../assets/sprites/plant_03.png')}
                            />
                        ) : ( 
                            <View style={ styles.plant }></View>
                        ) }
                        <Text style={styles.flowerCount}>{ item.conditions.hard }</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    labelText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 15,
    },

    box: {
        height: 80, 
        width: 80,
        alignItems: 'center',
    },
    plant: {
        height: 50,
        width: 50,
        marginTop: 5,
    },
    flowerCount: {
        fontFamily: 'Nunito-Bold',
        color: 'white'
    }
})