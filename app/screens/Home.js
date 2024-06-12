import React, { useState } from 'react';
import { Image, Text, View, FlatList, Dimensions } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import ProgressBar from '../components/ProgressBar';

const { width, height } = Dimensions.get('screen');

export default function Home(){
    const [courseData, setCourseData] = useState([
        { key: '1', course: 'Algebra', totalWeeks: 8, finishedWeeks: 2 },
        { key: '2', course: 'Analysis', totalWeeks: 8, finishedWeeks: 4 },
        { key: '3', course: 'Theory of Algorithms', totalWeeks: 8, finishedWeeks: 1 },
        { key: '4', course: 'Discrete Maths', totalWeeks: 8, finishedWeeks: 7 }
    ])
    
    return (
        <View style={ { backgroundColor: 'white', ...globalStyles.container} }> 
            <View style={globalStyles.header}>
                <Text style={globalStyles.title}> Welcome to Flower Hunt! </Text>
            </View>
            <View style={globalStyles.body}>
                <Image 
                    source={require('../../assets/images/home_flower.png')}
                    style={{ marginTop: 5, height: '30%' }}
                />
                <Text style={{ 
                    alignSelf: 'center', 
                    marginTop: 20, 
                    ...globalStyles.title
                }}> 
                    Become An Experienced Learner!
                </Text>
                
            </View>
        </View>

    )
}