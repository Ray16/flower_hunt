import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';

const questionSet = {
    question: 'What is the runtime complexity of binary search?',
    answer1: 'A: O(1)',
    answer2: 'B: O(logn)',        
    answer3: 'C: O(n)',
    answer4: 'D: O(nlogn)',
    correct: 2,
}

export default function Question({ navigation }){
    const [submit, setSubmit] = useState(-1);
    const [continueVisible, setContinueVisible] = useState(false);

    const pressHandler = (pressed) => {
        if(submit == -1){
            setSubmit(pressed);
            setContinueVisible(true);
            setIsRunning(false);
        }
    }

    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval;
        if(isRunning) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <View style={globalStyles.container}>
            <Text style={ { 
                alignSelf: 'flex-end', 
                padding: 10,
                width: 140,
                backgroundColor: '#AAF0C9',
                marginTop: -30,
                marginBottom: 30,
            } }
            >
                Time Taken: {formatTime(seconds)}
            </Text>
            <Text style={ { marginBottom: 10, ...globalStyles.title } }>{ questionSet.question }</Text>
            <TouchableOpacity style={ [styles.card,
                submit != -1 && questionSet.correct == 1 ? styles.right :
                (submit == 1 && questionSet.correct != 1 ? styles.wrong : styles.inactive )
            ] }
            onPress={() => pressHandler(1)}>
                <Text style={ { marginLeft: 10, ...globalStyles.text } }>{ questionSet.answer1 }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card,
                submit != -1 && questionSet.correct == 2 ? styles.right :
                (submit == 2 && questionSet.correct != 2 ? styles.wrong : styles.inactive )
            ]}
            onPress={() => pressHandler(2)}>
                <Text style={ { marginLeft: 10, ...globalStyles.text } }>{ questionSet.answer2 }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ [styles.card,
                submit != -1 && questionSet.correct == 3 ? styles.right :
                (submit == 3 && questionSet.correct != 3 ? styles.wrong : styles.inactive )
            ]}
            onPress={() => pressHandler(3)}>
                <Text style={ { marginLeft: 10, ...globalStyles.text } }>{ questionSet.answer3 }</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card,
                submit != -1 && questionSet.correct == 4 ? styles.right :
                (submit == 4 && questionSet.correct != 4 ? styles.wrong : styles.inactive )
            ]}
            onPress={() => pressHandler(4)}>
                <Text style={ { marginLeft: 10, ...globalStyles.text } }>{ questionSet.answer4 }</Text>
            </TouchableOpacity>
            {continueVisible ? (
            <TouchableOpacity 
                style={styles.continue}
                onPress={() => navigation.navigate('Garden')}>
                <Text style={{
                    fontFamily: 'EBG-regular', 
                }}>Continue</Text>
            </TouchableOpacity>
            ) : (
                <View style={styles.placeholder}></View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        elevation: 3,
        shadowOffset: {width: 5, height: 5},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        paddingVertical: 4,
        width: '75%',
        marginVertical: 10,
    },
    inactive: {
        backgroundColor: '#f1f1f1',
    },
    wrong: {
        backgroundColor: '#FF7F7F',
    },
    right: {
        backgroundColor: '#90EE90',
    },
    continue: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#77C3EC',
        marginTop: 30,
        borderRadius: 5,
    },
    placeholder: {
        marginTop: 30,
        height: 38,
        width: 30,
    }
})
