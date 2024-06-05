import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import { NavigationActions } from '@react-navigation/native-stack';

export default function Courses({ navigation }){
    const [courses, setCourses] = useState([
        'Algebra',
        'Analysis',
        'Theory of Algorithms',
        'Discrete Math'
    ])

    const pressHandler = () => {
        navigation.navigate('Garden')
    }

    return (
        <View style={globalStyles.container}> 
            <Text style={globalStyles.title}>Courses:</Text>
            <FlatList
                style={{width: '65%'}}
                data={courses}
				renderItem={({ item }) => (
					<View style={{ alignItems: 'center' }}>
						<TouchableOpacity style={
                            {
                                width: '100%',
                                backgroundColor: 'white',
                                borderRadius: 5,
                                borderColor: 'black',
                                borderWidth: 1,
                                marginVertical: 10,
                            }
                        }
                            onPress={pressHandler}
                        >
                            <Text style={{
                                padding: 10,
                                fontFamily: 'EBG-reguler',
                                fontSize: 14
                            }}>{ item }</Text>
                        </TouchableOpacity>
					</View>
				)}
            />
        </View>
    )
}