import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Courses({ navigation }){
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState([])

    const fetchCourses = async () => {
        try {
            const response = await fetch(
                'http://129.114.24.200:8001/courses', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        uid: '100',
                    }),
                }
            )

            const data = await response.json();
            setCourses(data);

        } catch(error) {
            console.log('Error fetching data: ', error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setTimeout(fetchCourses, 10);
    }, [])

    const pressHandler = (course_id) => {
        navigation.navigate('Garden', {
            course_id: course_id,
        });
    }

    return (
        <View style={globalStyles.container}> 
            { isLoading ? (
                <ActivityIndicator />
                ) : (
                <View style={ {width: '100%', ...globalStyles.container} }>
                    <Text style={ { marginTop: 50, ...globalStyles.title } }>Courses:</Text>
                    <FlatList
                        style={ { width: '100%' } }
                        data={courses}
                        keyExtractor={(item) => item.course_id}
                        renderItem={({ item }) => (
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity style={
                                    {
                                        width: '90%',
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        borderColor: '#A9FFA9',
                                        borderWidth: 3,
                                        marginVertical: 5,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifycontent: 'space-between',
                                    }
                                }
                                    onPress={() => pressHandler(item.course_id)}
                                >
                                    <Text 
                                        style={ {
                                            flex: 1,
                                            padding: 15,
                                            fontFamily: 'Nunito-Bold',
                                            fontSize: 14
                                        } }
                                    >
                                        { item.course_name }
                                    </Text>
                                    
                                    <Ionicons 
                                        name='chevron-forward'
                                        size={24}
                                        style={{ marginRight: 5 }}
                                    />

                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}  
        </View>
    )
}