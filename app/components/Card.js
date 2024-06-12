import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { globalStyles, images } from '../globalStyles/globalStyles';

export default function Card({ item, handleIcon, handleSteal }){
    return (
        <View style={styles.container}>

            {/* Left Week Indicator */}
            <Text style={styles.label}>Week {item.week}:</Text>

            {/* Background Image */}
            <ImageBackground 
                source={require('../../assets/images/GardenBackground.jpg')}
                imageStyle={{resizeMode: 'contain', opacity: 0.7 }}
                style={styles.container}
            >
            
            { item.active ? 
            
            (
                /* Active Week */
                <View style={{ flexDirection: 'row' }}>

                    {/* Icon 1 */}
                    <TouchableOpacity 
                        style={ {
                            marginLeft: -15,
                            marginTop: 5,
                            width: 42, 
                            height: 45, 
                        } }
                        onPress={() => handleIcon(item.conditions[0])}>
                    <Image source={ images.condition[item.conditions[0]] } style={[
                        item.conditions[0] == 0 && styles.pot,
                        item.conditions[0] == 1 && styles.flower,
                    ]}/>
                    </TouchableOpacity>

                    {/* Icon 2 */}
                    <TouchableOpacity 
                        style={{ 
                            marginTop: 2, 
                            width: 42, 
                            height: 45, 
                        }}
                        onPress={() => handleIcon(item.conditions[1])}>
                    <Image source={ images.condition[item.conditions[1]] } style={[
                        item.conditions[1] == 0 && styles.pot,
                        item.conditions[1] == 1 && styles.flower,
                    ]}/>
                    </TouchableOpacity>

                    {/* Icon 3 */}
                    <TouchableOpacity 
                        style={{ 
                            marginTop: 5,  
                            width: 42, 
                            height: 45, 
                        }}
                        onPress={() => handleIcon(item.conditions[2])}>
                    <Image source={ images.condition[item.conditions[2]] } style={[
                        item.conditions[2] == 0 && styles.pot,
                        item.conditions[2] == 1 && styles.flower,
                    ]}/>
                    </TouchableOpacity>

                    {/* Icon 4 */}
                    <TouchableOpacity 
                        style={{    
                            marginTop: 5, 
                            width: 42, 
                            height: 45, 
                        }}
                        onPress={() => handleIcon(item.conditions[3])}>
                    <Image 
                        source={ images.condition[item.conditions[3]] } 
                        style={[
                            item.conditions[3] == 0 && styles.pot,
                            item.conditions[3] == 1 && styles.flower,
                        ]}/>
                    </TouchableOpacity>

                    {/* Steal Icon */}
                    <TouchableOpacity 
                        style={ {  
                            marginLeft: 15, 
                            marginTop: 5, 
                            width: 30, 
                            height: 30 
                        } }
                        onPress={() => handleSteal()}
                    >
                        <Image 
                            source={ require('../../assets/images/Bucket.png') } 
                            style={ styles.steal }
                        />
                    </TouchableOpacity>

                </View>
            ) 
            : 
            (
                /* Inactive Week */
                <View style={ styles.placeholder }>  
                </View>
            )
            }

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
    label: {
        fontFamily: 'EBG-bold',
        fontSize: 15,
        marginRight: 10,
    },


    flower: {
        marginTop: -15,
        width: 50,
        height: 50,
    },
    pot: {
        marginLeft: 15,
        marginTop: 5,
        width: 20,
        height: 20,
    },

    steal: {
        marginLeft: 3,
        marginTop: 2,
        width: 30,
        height: 30,
    },

    placeholder: {
        height: 50
    }
})