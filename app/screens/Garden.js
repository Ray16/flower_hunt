import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Alert } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../components/Card';
import StealInfo from '../components/StealInfo';
import Question from '../components/Question';

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

  const [modalOneOpen, setModalOneOpen] = useState('false');
  const [modalTwoOpen, setModalTwoOpen] = useState('false');
  const [week, setWeek] = useState(0);
  const [mode, setMode] = useState(0);

  const handleIcon = ( condition ) => {
    if(condition == 0) {
      Alert.alert('Sorry!', 'This module is not open yet.',
        [{text: 'Understood', onPress: () => console.log('Locked icon clicked on.')}]
      )
    } else if (condition == 1) {
      Alert.alert('Relax!', 'This plant was not stolen! You don\'t need to revive it!',
        [{text: 'Got it!', onPress: () => console.log('Flower icon clicked on.')}]
      )
    } else if (condition == 2) {
      setMode(2);
      setModalOneOpen(true);
    }
  };
  const handleSteal = () => {
    setMode(1);
    setModalOneOpen(true);
  }
  const handleStealInfo = ( week ) => {
    setWeek(week);
    setModalTwoOpen(true);
  }

  return (
    <View style={globalStyles.container}> 
      <Modal visible={modalOneOpen}>
        <Question userId='Hanlei' mode={mode} setModalOpen={setModalOneOpen}/>
      </Modal>

      <Modal visible={modalTwoOpen}>
        <Ionicons 
          name='close'
          size={24}
          onPress={() => setModalTwoOpen(false)}
          style={styles.modal}
        />
        <StealInfo userId='Hanlei' week={week}/>
      </Modal>

      <Text style = {globalStyles.title}>Welcome to Your Garden!</Text>
        <FlatList
          data={modules}
          renderItem={({ item }) => (
            <Card item={ item }
                  handleIcon={handleIcon}
                  handleStealInfo={handleStealInfo}/>
          )}
          showsVerticalScrollIndicator={true}
          style={{ flex: 1, paddingHorizontal: 10, borderWidth: 1, borderColor: 'black' }}
        />
        <TouchableOpacity style={{backgroundColor: 'red',
                                  borderRadius: 7,
                                  marginVertical: 10,
                                  paddingHorizontal: 10,
        }}
          onPress={() => handleSteal()}
        >
          <Text style={{color: 'white', ...globalStyles.title}}> Steal </Text>
        </TouchableOpacity>
        <View>
          <Text style={globalStyles.text}> Click on the icons above to revive your flowers!</Text>
        </View>

        <TouchableOpacity onPress={() => (
          navigation.navigate('CoursePage')
        )}>
          <Text>Back</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    marginTop: 20,
    borderWidth: 1, 
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  }
})