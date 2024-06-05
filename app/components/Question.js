import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';

const questionSet = {
    question: 'What is the runtime complexity of binary search?',
    answer1: 'O(1)',
    answer2: 'O(logn)',        
    answer3: 'O(n)',
    answer4: 'O(nlogn)'
}

export default function Question({ userId, mode, setModalOpen }){
    const [answer, setAnswer] = useState('');

    const handleAnswer = () => {
        /* handle answer */
        setModalOpen(false);
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.questionContainer}>
                <Text style={globalStyles.title}>{questionSet.question}</Text>
                <Text style={globalStyles.text}>A: {questionSet.answer1}</Text>
                <Text style={globalStyles.text}>B: {questionSet.answer2}</Text>
                <Text style={globalStyles.text}>C: {questionSet.answer3}</Text>
                <Text style={globalStyles.text}>D: {questionSet.answer4}</Text>
            </View>
            <TextInput
                style={{width: '50%', ...globalStyles.textInput}}
                placeholder='Answer'
                onChangeText={(val) => setAnswer(val)}
            />
            <TouchableOpacity style={{borderColor: '#77DD77',
                                borderWidth: 1,
                                borderRadius: 29,
                                marginVertical: 10,
                                paddingHorizontal: 10,
            }}
            onPress={() => handleAnswer()}>
                <Text style={{color: '#77DD77', 
                                fontSize: 14,
                                fontFamily: 'EBG-Bold',
                                fontWeight: 'bold',
                                padding: 10,
                                }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    questionContainer: {
        padding: 10,
        alignItems: 'flex-start',
    }
})