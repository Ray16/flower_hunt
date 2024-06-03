import React, { useState } from 'react';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUpForm from './screens/Signup';
import SecretCreation from './screens/Secret';

const getFonts = () => Font.loadAsync({
    'EBG-regular': require('../assets/fonts/EBGaramond-Regular.ttf'),
    'EBG-bold': require('../assets/fonts/EBGaramond-Bold.ttf'),
    'EBG-italic': require('../assets/fonts/EBGaramond-Italic.ttf')
});

const RootStack = createNativeStackNavigator();

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
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Sign Up" component={SignUpForm} />
        <RootStack.Screen name="Secret Creation" component={SecretCreation} />
      </RootStack.Navigator>
    );
}