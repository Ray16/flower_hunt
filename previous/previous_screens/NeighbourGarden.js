import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, 
  ImageBackground, TouchableOpacity, Dimensions, 
  Alert} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../globalStyles/globalStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import NeighbourCard from '../components/NeighbourGardenCard';

const { width, height } = Dimensions.get('screen');

export default function NeighbourGarden({ route, navigation }){
  const { course_id, neighbour_id, neighbour_user } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://129.114.24.200:8001/garden/load_garden', {
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
      console.log("Neighbor Garden data", data);
      if(data.status === "success"){
        setUserData(data);
      } else {
        console.log(data.message);
      }
    } catch(error) {
      console.log('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [course_id, neighbour_id])
  );

  const iconHandler = (course_id, topic, difficulty, neighbour_id, num_flowers) => {
    if(num_flowers <= 0){
      Alert.alert("Ouch, I don't have any flowers.");
    }
    else{
      navigation.navigate('Question', {
          course_id: course_id,
          topic: topic,
          difficulty: difficulty,
          neighbour_id: neighbour_id, 
      })
    }
  }

  return (
    <ImageBackground 
      source={require('../../assets/images/garden_gold_v3.png')}
      style={{ width: '100%', height: '100%' }}
    >
      { isLoading ? (
        <ActivityIndicator />
      ) : ( 
          <View>
            <View 
              style={{ 
                marginTop: height > 1000 ? 50 : 0,
                marginLeft: width > 500 ? 50 : 0,
                marginRight: width > 500 ? 50 : 0,
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={{
                  height: 150,
                  width: 150,
                }}
                onPress={() => navigation.navigate('Classmates', 
                  { course_id: course_id })}
              >
                <ImageBackground source={require('../../assets/images/farm_home.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <Text style={{
                    fontFamily: 'Nunito-Bold',
                    fontSize: 30,
                    alignSelf: 'center',
                    color: 'white',

                    marginTop: 95,
                    marginLeft: 7,
                  }}>
                    Back
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            {/* body of the app */}
            <View 
              style={ { 
                height: '70%',
                alignItems: 'center',
              } }
            >
              <FlatList 
                style={ { width: '100%', marginBottom: 20 } }
                data={userData.garden_rows}
                keyExtractor={(item) => item.row_num}
                renderItem={({ item }) => (
                  <NeighbourCard item={item} iconHandler={iconHandler} course_id={course_id} neighbour_id={neighbour_id}/>
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