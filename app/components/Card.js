import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { globalStyles, images } from '../globalStyles/globalStyles';

export default function Card({ item, handleIcon, handleSteal }){
    return (
        <View style={styles.container}>
            <Text style={styles.week}>Week {item.key}:</Text>
            <ImageBackground 
                source={require('../../assets/images/GardenBackground.jpg')}
                imageStyle={{resizeMode: 'contain', opacity: 0.7 }}
                style={styles.container}
            >
                <TouchableOpacity style={{ marginLeft: -15, 
                                            marginTop: 5,
                                            width: 42, 
                                            height: 45, }}
                    onPress={() => handleIcon(item.condition1)}>
                <Image source={ images.condition[item.condition1] } style={[
                    item.condition1 == 0 && styles.lock,
                    item.condition1 == 1 && styles.flower,
                    item.condition1 == 2 && styles.pot,
                ]}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 0, 
                                            width: 42, 
                                            height: 45, }}
                    onPress={() => handleIcon(item.condition2)}>
                <Image source={ images.condition[item.condition2] } style={[
                    item.condition2 == 0 && styles.lock,
                    item.condition2 == 1 && styles.flower,
                    item.condition2 == 2 && styles.pot,
                ]}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 5,  
                                            width: 42, 
                                            height: 45, }}
                    onPress={() => handleIcon(item.condition3)}>
                <Image source={ images.condition[item.condition3] } style={[
                    item.condition3 == 0 && styles.lock,
                    item.condition3 == 1 && styles.flower,
                    item.condition3 == 2 && styles.pot,
                ]}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{    
                        marginTop: 5, 
                        width: 42, 
                        height: 45, 
                    }}
                    onPress={() => handleIcon(item.condition4)}>
                <Image 
                    source={ images.condition[item.condition4] } 
                    style={[
                        item.condition4 == 0 && styles.lock,
                        item.condition4 == 1 && styles.flower,
                        item.condition4 == 2 && styles.pot,
                    ]}/>
                </TouchableOpacity>
                <TouchableOpacity style={{  marginLeft: 15, 
                                            marginTop: 5, 
                                            width: 30, 
                                            height: 30 }}
                    onPress={() => handleSteal( item.condition1 )}>
                <Image source={
                    item.condition1 == 0 ? require('../../assets/images/Invisible.png')
                    : require('../../assets/images/Bucket.png')
                } style={styles.steal}/>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    week: {
        fontFamily: 'EBG-bold',
        fontWeight: 'bold',
        fontSize: 15,
        marginRight: 10,
    },
    flower: {
        marginTop: -15,
        width: 50,
        height: 50,
    },
    lock: {
        width: 40,
        height: 40,
    },
    pot: {
        marginLeft: 15,
        marginTop: 5,
        width: 20,
        height: 20,
    },
    steal: {
        marginLeft: 3,
        marginTop: -5,
        width: 30,
        height: 30,
    },
})