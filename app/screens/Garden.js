import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator,
  ImageBackground, Dimensions } from "react-native";

import { globalStyles } from '../globalStyles/globalStyles';
import Card from '../components/Card';
import { useUser } from '../components/UserContext';
import SunlightBar from '../components/SunlightBar';

import Ionicons from '@expo/vector-icons/Ionicons';

const { width, height } = Dimensions.get('screen');

export default function Garden({ route, navigation }){
  const { course_id } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const { userState } = useUser();

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://129.114.24.200:8001/garden/load_garden', {
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
      console.log("My Garden data", data);
      if(data.status == "success"){
        setUserData(data);
      }else{
        console.log(data.message);
      }

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
      source={require('../../assets/images/garden_green_no_home_v2.png')}
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
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={{
                  height: 150,
                  width: 150,
                }}
                onPress={() => navigation.navigate('Courses', 
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

              <View style={ { 
                marginTop: 80,
              } }>
                <SunlightBar 
                  sunlight={ userData.sunlight }
                />
              </View>
        
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
                  Select Neighbours
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