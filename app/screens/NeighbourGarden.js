import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import NeighbourCard from '../components/NeighbourCard';

export default function NeighbourGarden({ route, navigation }){
  const { course_id, neighbour_id, neighbour_user } = route.params;

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
            uid: neighbour_id,
            course_id: course_id,
          }),
        }
      );

      const data = await response.json();
      setModules(data)

    } catch(error) {
      console.log('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTimeout(fetchData, 10);
  }, []);

  const iconHandler = (course_id, topic, difficulty) => {
    navigation.navigate('Question', {
        course_id: course_id,
        topic: topic,
        difficulty: difficulty,
    })
  }

  return (
    <View style={globalStyles.container}>
      { isLoading ? (
        <ActivityIndicator />
      ) : ( 
        <View style={globalStyles.container}>
          {/* header of the app */}
          <View style={styles.header}>

            {/* back button to previous page */}
            <Ionicons
              name='chevron-back'
              size={24}
              style={ { marginTop: 4 } }
              onPress={() => (navigation.navigate('Classmates', {
                course_id: course_id
              }))}
            />

            <Text style={globalStyles.title}>
                { neighbour_user }'s Garden
            </Text>
          </View>

          {/* body of the app */}
          <View style={styles.body}>

            {/* renders the garden for each topic */}
            <FlatList
              style={ { width: '100%' } }
              data={modules.garden_rows}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NeighbourCard 
                    item={item} 
                    iconHandler={iconHandler}
                    course_id={course_id}
                />
              )}
              showsVerticalScrollIndicator={true}
            />
          </View> 
        </View>
      )}
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
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    sunlight: {
      padding: 10,
      borderRadius: 50,
      backgroundColor: '#A9FFA9',
    },
    sunlightText: {
      alignSelf: 'center',
      fontFamily: 'Nunito-Bold',
      fontSize: 14,
    }
  
  })