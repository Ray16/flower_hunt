import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../components/Card';

export default function Garden({ navigation }){
  const [isLoading, setIsLoading] = useState(true);
  const [modules, setModules] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://129.114.24.200:8001/garden/page_load', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: 100,
            course_id: 14100
          }),
        }
      );

      const data = await response.json();
      setModules(data)
      console.log('Response Data: ', data);

    } catch(error) {
      console.log('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(fetchData, 10);
  }, [])

  const [mode, setMode] = useState(-1);
  const handleIcon = ( condition ) => {
    if (condition == 1) {
      Alert.alert('Relax!', 'This plant was not stolen! You don\'t need to revive it!',
        [{text: 'Got it!', onPress: () => console.log('Flower icon clicked on.')}]
      )
    } else if (condition == 2) {
      setMode(0);
      navigation.navigate('Question');
    }
  }

  const handleSteal = () => {
    setMode(1);
    navigation.navigate('Classmates');
  }

  const [isFinalGradeVisible, setIsFinalGradeVisible] = useState(false);
  const [finalGrade, setFinalGrade] = useState('A');
  
  return (
    <View style={globalStyles.container}>

      {/* header of the app */}
      <View style={styles.header}>

        {/* back button to previous page */}
        <Ionicons
          name='chevron-back'
          size={24}
          style={{flex: 1}}
          onPress={() => (navigation.navigate('CoursePage'))}
        />

         {/* check stolen flowers */}
        <View style={{flex: 10}}></View>
          <TouchableOpacity 
            style={ {
              backgroundColor: '#AAF0C9',
              padding: 10,
              flex: 5
            } }
            onPress={() => (navigation.navigate('StolenFlower'))}
          >
            <Text style={{alignSelf: 'center'}}>
              Stolen Flowers
            </Text>
          </TouchableOpacity>
        </View>

      {/* body of the app */}
      <View style={styles.body}>
        <Text style={globalStyles.title}>
            Welcome to Your Garden!
        </Text>

        {/* renders the garden for each week */}
        <FlatList
          data={modules}
          keyExtractor={(item) => item.week}
          renderItem={({ item }) => (
            <Card item={item} handleIcon={handleIcon} handleSteal={handleSteal}/>
          )}
          showsVerticalScrollIndicator={true}
        />
        
        {/* final grade */}
        { isFinalGradeVisible && 
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text 
            style={{
              padding: 10,
              backgroundColor: '#AAF0C9',
              marginTop: 10,
            }}
          >
            Final Grade: { finalGrade } 
          </Text>
          <TouchableOpacity style={{
            padding: 10,
            backgroundColor: '#AAF0C9',
            marginTop: 10,
            marginRight: -10,
            marginLeft: 20,
            borderRadius: 10,
          }}
            onPress={() => navigation.navigate('Secret')}>
            <Text>Check Stolen Flowers</Text>
          </TouchableOpacity>
        </View> }

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 20,
  }
})