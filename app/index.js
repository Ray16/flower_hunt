import React, { useState } from 'react';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Ionicons from '@expo/vector-icons/Ionicons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import SignUpForm from './screens/Signup';
import SecretCreation from './screens/Secret';

import Home from './screens/Home';

import Courses from './screens/Courses';
import Garden from './screens/Garden';
import StolenFlower from './screens/StolenFlowerInfo';
import Question from './screens/Question';
import Classmates from './screens/Classmates';
import Secrets from './screens/SecretReveal';

import Settings from './screens/Settings';
import About from './screens/About';
import Tutorial from './screens/Tutorial';

const getFonts = () => Font.loadAsync({
    'EBG-regular': require('../assets/fonts/EBGaramond-Regular.ttf'),
    'EBG-bold': require('../assets/fonts/EBGaramond-Bold.ttf'),
    'EBG-italic': require('../assets/fonts/EBGaramond-Italic.ttf')
});

const CourseStack = createNativeStackNavigator();

function CourseStackNavigator() {
    return (
        <CourseStack.Navigator screenOptions={{headerShown: false}}>
            <CourseStack.Screen name="CoursePage" component={Courses} />
            <CourseStack.Screen name="Garden" component={Garden} />
            <CourseStack.Screen name="StolenFlower" component={StolenFlower} />
            <CourseStack.Screen name="Classmates" component={Classmates} />
            <CourseStack.Screen name="Question" component={Question} />
            <CourseStack.Screen name="Secret" component={Secrets} />
        </CourseStack.Navigator>
    );
}

const SettingStack = createNativeStackNavigator();

function SettingStackNavigator() {
    return (
        <SettingStack.Navigator screenOptions={{headerShown: false}}>
            <SettingStack.Screen name="Settings" component={Settings} />
            <SettingStack.Screen name="About" component={About} />
            <SettingStack.Screen name="Tutorial" component={Tutorial} />
        </SettingStack.Navigator>
    );
}

const HomeTab = createBottomTabNavigator();

function HomeTabNavigator() {
    return (
        <HomeTab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Setting') {
                iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name == 'Courses') {
                iconName = focused ? 'book' : 'book-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#5bb450',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
          initialRouteName='Home'
        >
        <HomeTab.Screen name='Courses' component={CourseStackNavigator}/>
        <HomeTab.Screen name='Home' component={Home}/>
        <HomeTab.Screen name='Setting' component={SettingStackNavigator}/>
      </HomeTab.Navigator>
    );
}

const RootStack = createNativeStackNavigator();

function LoginStackNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="Sign Up" component={SignUpForm} />
            <RootStack.Screen name="Secret Creation" component={SecretCreation} />
            <RootStack.Screen 
                            options={{headerShown: false}} 
                            name="HomeTab" 
                            component={HomeTabNavigator} />
        </RootStack.Navigator>
    );
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
        <LoginStackNavigator />
    );
}