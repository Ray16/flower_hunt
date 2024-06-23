import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Question from './screens/Question';

const getFonts = () => Font.loadAsync({
    'Baloo2-Regular': require('../assets/fonts/Baloo2-Regular.ttf'),
    'Baloo2-Bold': require('../assets/fonts/Baloo2-Bold.ttf'),
});

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
        <SafeAreaView>
            <Question />
        </SafeAreaView>
    );
}