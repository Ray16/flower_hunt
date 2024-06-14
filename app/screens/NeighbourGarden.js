import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ImageBackground, TouchableOpacity } from "react-native";
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import NeighbourCard from '../components/NeighbourCard';

export default function NeighbourGarden({ route, navigation }){
  const { course_id, neighbour_id, neighbour_user } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

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
      setUserData(data)

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
    <ImageBackground 
      source={require('../../assets/images/GardenBackground.jpg')}
      style={{ width: '100%', height: '100%' }}
    >
      { isLoading ? (
        <ActivityIndicator />
      ) : ( 
          <View>
            <View 
              style={{ 
                flexDirection: 'row',
                marginTop: 82,
                marginRight: 15, 
              }}
            >
              <TouchableOpacity
                style={{
                  marginTop: 30,
                  marginLeft: 67,
                }}
                onPress={() => navigation.navigate('Classmates', 
                  { course_id: course_id })}
              >
                <Text style={{
                  fontFamily: 'Nunito-Bold',
                  fontSize: 13,
                  color: '#0062ff',
                  alignSelf: 'center',
                }}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>

            {/* body of the app */}
            <View 
              style={ { 
                height: 420,
                alignItems: 'center',
              } }
            >
              <FlatList 
                style={ { width: '100%', marginBottom: 20 } }
                data={userData.garden_rows}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <NeighbourCard item={item} iconHandler={iconHandler} course_id={course_id}/>
                )}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </View>
          )
      }
    </ImageBackground> 
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