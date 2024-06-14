import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { globalStyles } from '../globalStyles/globalStyles';

export default function Question({ navigation, route }){
    const { course_id, topic, difficulty } = route.params;

    const [question, setQuestion] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchQuestions = async () => {
        try {
            const response = await fetch(
              'http://129.114.24.200:8001/garden/steal', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  uid: '100',
                  course_id: course_id,
                  topic: topic,
                  difficulty: difficulty,
                }),
              }
            );
      
            const data = await response.json();
            setQuestion(data)
      
          } catch(error) {
            console.log('Error fetching data: ', error);
          } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        setTimeout(fetchQuestions, 10)
    }, [])

    const [submit, setSubmit] = useState("Not Submitted");
    const [continueVisible, setContinueVisible] = useState(false);

    const pressHandler = (answer) => {
        if(submit == "Not Submitted"){
            setSubmit(answer);
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

    const submitAnswer = async () => {
        try {
            const response = await fetch(
                'http://129.114.24.200:8001/garden/submit_answer', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        uid: '100',
                        question_id: question.question_id,
                        response_time: seconds,
                        user_answer: submit,
                        correct_answer: question.answer,
                    })
                }
            )
        } catch(error) {
            console.log('Error fetching data: ', error)
        }
    }

    useEffect(() => {
        setTimeout(submitAnswer, 10)
    }, [submit != 'Not Submitted'])

    return (
        <View style={globalStyles.container}>

            { /*<Text style={ { 
                alignSelf: 'flex-end', 
                padding: 10,
                width: 140,
                backgroundColor: '#AAF0C9',
                marginTop: -30,
                marginBottom: 30,
            } }
            >
                Time Taken: {formatTime(seconds)}
            </Text>*/ }

            { isLoading ? <ActivityIndicator /> 
                :
            (
                <View style={{ width: '100%', ...globalStyles.container }}>

                    {/* Question */}
                    <Text style={ { marginBottom: 10, ...globalStyles.title } }>{ question.question }</Text>

                    {/* First Answer */}
                    <TouchableOpacity style={ [styles.card,
                        submit != "Not Submitted" && question.answer == "A" ? styles.right :
                        (submit == "A" && question.answer != "A" ? styles.wrong : styles.inactive )
                    ] }
                    onPress={() => pressHandler('A')}>
                        <Text style={ { marginLeft: 10, ...globalStyles.text } }>A: { question.options[0] }</Text>
                    </TouchableOpacity>

                    {/* Second Answer */}
                    <TouchableOpacity style={[styles.card,
                        submit != "Not Submitted" && question.answer == "B" ? styles.right :
                        (submit == "B" && question.answer != "B" ? styles.wrong : styles.inactive )
                    ]}
                    onPress={() => pressHandler('B')}>
                        <Text style={ { marginLeft: 10, ...globalStyles.text } }>B: { question.options[1] }</Text>
                    </TouchableOpacity>

                    {/* Third Answer */}
                    <TouchableOpacity style={ [styles.card,
                        submit != "Not Submitted" && question.answer == "C" ? styles.right :
                        (submit == "C" && question.answer != "C" ? styles.wrong : styles.inactive )
                    ]}
                    onPress={() => pressHandler('C')}>
                        <Text style={ { marginLeft: 10, ...globalStyles.text } }>C: { question.options[2] }</Text>
                    </TouchableOpacity>

                    {/* Fourth Answer*/}
                    <TouchableOpacity style={[styles.card,
                        submit != "Not Submitted" && question.answer == "D" ? styles.right :
                        (submit == "D" && question.answer != "D" ? styles.wrong : styles.inactive )
                    ]}
                    onPress={() => pressHandler('D')}>
                        <Text style={ { marginLeft: 10, ...globalStyles.text } }>D: { question.options[3] }</Text>
                    </TouchableOpacity>
                    
                    {/* Continue Button */}
                    {continueVisible ? (
                    <TouchableOpacity 
                        style={styles.continue}
                        onPress={() => navigation.navigate('Garden', { course_id: course_id })}>
                        <Text style={{
                            fontFamily: 'Nunito-Regular', 
                        }}>Continue</Text>
                    </TouchableOpacity>
                    ) : (
                        <View style={styles.placeholder}></View>
                    )}

                </View>
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
        height: 40,
    }
})
