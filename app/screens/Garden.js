import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../components/Card';

export default function Garden({ route, navigation }){
  const { course_id } = route.params;

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
            uid: '100',
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
  }, [])

  const stealHandler = (course_id) => {
    navigation.navigate('Classmates', {
      course_id: course_id,
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
              style={{flex: 1}}
              onPress={() => (navigation.navigate('CoursePage'))}
            />

            <View></View>

            {/* check current sunlight */}
            <View style={styles.sunlight}>
              <Text style={styles.sunlightText}>Sunlight: {modules.sunlight}</Text> 
            </View>
          </View>

          {/* body of the app */}
          <View style={styles.body}>
            <Text style={globalStyles.title}>
                Flower Collection
            </Text>

            {/* renders the garden for each topic */}
            <FlatList
              style={ { width: '100%' } }
              data={modules.garden_rows}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Card item={item}/>
              )}
              showsVerticalScrollIndicator={true}
            />
            
            {/* renders the steal button */}
            <TouchableOpacity
              style={ {
                marginTop: 25,
                marginBottom: -25,
                backgroundColor: 'red',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 50,
              } }
              onPress={() => stealHandler(course_id)}
            >
              <Text 
                style={{
                  color: 'white',
                  fontFamily: 'Nunito-Bold',
                  fontSize: 16,
                }}
              >
                Steal
              </Text>
            </TouchableOpacity>

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