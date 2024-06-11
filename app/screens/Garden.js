import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../components/Card';

export default function Garden({ navigation }){
  const [modules, setModules] = useState([
    { 
      key: '1', 
      condition1: '1', 
      condition2: '1', 
      condition3: '2', 
      condition4: '2', 
      stolen: '4'
    }, 
    { 
      key: '2', 
      condition1: '1', 
      condition2: '1', 
      condition3: '1', 
      condition4: '1', 
      stolen: '2'
    }, 
    { 
      key: '3', 
      condition1: '1', 
      condition2: '2', 
      condition3: '2', 
      condition4: '1', 
      stolen: '0'
    }, 
    { 
      key: '4', 
      condition1: '0', 
      condition2: '0', 
      condition3: '0', 
      condition4: '0', 
      stolen: '0'
    }, 
    { 
      key: '5', 
      condition1: '0', 
      condition2: '0', 
      condition3: '0', 
      condition4: '0', 
      stolen: '0'
    }, 
    { 
      key: '6', 
      condition1: '0', 
      condition2: '0', 
      condition3: '0', 
      condition4: '0', 
      stolen: '0'
    }, 
  ])

  /*
   0: locked
   1: not stolen
   2: stolen
  */

  const [mode, setMode] = useState(-1);
  const [modalOpen, setModalOpen] = useState('false');

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

  const handleSteal = ( condition ) => {
    if(condition != 0) {
      setMode(1);
      navigation.navigate('Classmates');
    }
  }

  const [isFinalGradeVisible, setIsFinalGradeVisible] = useState(false);

  const [finalGrade, setFinalGrade] = useState('A');
  
  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Ionicons
          name='chevron-back'
          size={24}
          style={{flex: 1}}
          onPress={() => (navigation.navigate('CoursePage'))}
        />
        <View style={{flex: 10}}></View>
        <TouchableOpacity style={{backgroundColor: '#AAF0C9',
                                  padding: 10,
                                  flex: 5}}
            onPress={() => (navigation.navigate('StolenFlower'))}>
          <Text style={{alignSelf: 'center',
            }}>Stolen Flowers</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={globalStyles.title}>
            Welcome to Your Garden!
        </Text>

        <FlatList
          data={modules}
          renderItem={({ item }) => (
            <Card item={item} handleIcon={handleIcon} handleSteal={handleSteal}
            />
          )}
          showsVerticalScrollIndicator={true}
        /> 

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
        </View>}
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