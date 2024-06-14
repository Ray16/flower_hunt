import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '../components/UserContext';

export default function Classmates({ navigation, route }){
    const { course_id } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [classmates, setClassmates] = useState([]);

    const { userState } = useUser();

    const fetchClassmates = async () => {
        try {
            const response = await fetch(
                'http://129.114.24.200:8001/select_neighbor', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        uid: userState.userId,
                        course_id: course_id,
                    })
                }
            )

            const data = await response.json();
            setClassmates(data);

        } catch(error) {
            console.log('Error fetching data: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setTimeout(fetchClassmates, 10)
    }, [])

    const selectNeighbour = (course_id, uid, user) => {
        navigation.navigate('NeighbourGarden', {
            course_id: course_id, 
            neighbour_id: uid,
            neighbour_user: user,
        });
    }

    return (
        <View style={globalStyles.container}>
            { isLoading ? 
            <ActivityIndicator /> : 
            (
                <View>

                    {/* back button to previous page */}
                    <View style={globalStyles.header}> 
                        <Ionicons
                        name='chevron-back'
                        size={24}
                        style={ { marginTop: 4 } }
                        onPress={() => (navigation.navigate('Garden', {
                            course_id: course_id
                        }))}
                        />

                        <Text style={globalStyles.title}>
                            Select A Neighbour
                        </Text>
                    </View>

                    <View style={globalStyles.body}>
                        <FlatList 
                            style={ { width: '85%', alignSelf: 'center' } }
                            data={ classmates }
                            keyExtractor={ (item) => item.uid }
                            numColumns={3}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={ {
                                        width: '33%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    } }
                                    onPress={() => selectNeighbour( course_id, item.uid, item.username )}
                                >
                                    <Text style={{
                                        fontFamily: 'Nunito-Bold',
                                        fontSize: 13,
                                        marginLeft: 5,
                                        marginTop: 10,
                                    }}>{ item.username }</Text>
                                    <ImageBackground 
                                        source={require('../../assets/images/ClassmatesBackground.jpg')}
                                        style={ {
                                            width: 70,
                                            height: 70,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        } }
                                    >
                                        <Text 
                                            style={ {
                                                fontFamily: 'Nunito-Bold',

                                            } }
                                        >
                                            { item.total_flowers }
                                        </Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            )}
        </View>
    )
}