import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator,
  ImageBackground } from "react-native";

import { globalStyles } from '../globalStyles/globalStyles';
import Card from '../components/Card';
import { useUser } from '../components/UserContext';
import SunlightBar from '../components/SunlightBar';

import Ionicons from '@expo/vector-icons/Ionicons';



export default function Garden({ route, navigation }){
  const { course_id } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const { userState } = useUser();

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://129.114.24.200:8001/garden/page_load', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: userState.userId,
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
  }, [])

  const stealHandler = (course_id) => {
    navigation.navigate('Classmates', {
      course_id: course_id,
    })
  }
  
  return (
    <ImageBackground 
      source={require('../../assets/images/garden_gold_01.png')}
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
                  marginLeft: -23,
                  flex: 1
                }}
                onPress={() => navigation.navigate('CoursePage', 
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

              <SunlightBar 
                sunlight={ userData.sunlight }
              />
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
                  <Card item={item}/>
                )}
                showsVerticalScrollIndicator={true}
              />
              
              {/* renders the steal button */}
              <TouchableOpacity
                style={ {
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
          )
      }
    </ImageBackground> 
  )
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  body: {
    flex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

})