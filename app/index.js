import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import SignUp from './screens/Signup';
import Question from './screens/Question';

// Accessing Font
const getFonts = () => Font.loadAsync({
    'Baloo2-Regular': require('../assets/fonts/Baloo2-Regular.ttf'),
    'Baloo2-Bold': require('../assets/fonts/Baloo2-Bold.ttf'),
});

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

// Creating Stack Navigator
const RootStack = createNativeStackNavigator();
function RootStackNavigator() {
    return (
        <View style={{ height: height, width: width }}>
            <RootStack.Navigator>
                <RootStack.Screen 
                    name="Login" 
                    component={Login}
                    options={{headerShown: false}}
                />
                <RootStack.Screen 
                    name="SignUp" 
                    component={SignUp}
                    options={{headerShown: false}}
                />
            </RootStack.Navigator>
        </View>
    )
}

export default function App(){
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if(!fontsLoaded){
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={()=>setFontsLoaded(true)}
                onError={(err) => console.log(err)}
            />
        )
    }

    return (
        <RootStackNavigator/>
    );
}