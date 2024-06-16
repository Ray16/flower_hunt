import React, { useState } from 'react';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Ionicons from '@expo/vector-icons/Ionicons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import SignUpForm from './screens/Signup';
import Garden from './screens/Garden';
import NeighbourGarden from './screens/NeighbourGarden';
import Question from './screens/Question';
import Classmates from './screens/Classmates';

import Home from './screens/Home';
import Courses from './screens/Courses';

import Settings from './screens/Settings';
import About from './screens/About';

import { UserProvider } from './components/UserContext';

const getFonts = () => Font.loadAsync({
    'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Italic': require('../assets/fonts/Nunito-Italic.ttf')
});


const SettingStack = createNativeStackNavigator();

function SettingStackNavigator() {
    return (
        <SettingStack.Navigator screenOptions={{headerShown: false}}>
            <SettingStack.Screen name="Settings" component={Settings} />
            <SettingStack.Screen name="About" component={About} />
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
        <HomeTab.Screen name='Courses' component={Courses}/>
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
            <RootStack.Screen 
                options={{headerShown: false}} 
                name="HomeTab" 
                component={HomeTabNavigator}
            />
            <RootStack.Screen name="Garden" component={Garden} 
                options={{headerShown: false}}
            />
            <RootStack.Screen name="Classmates" component={Classmates} 
                options={{headerShown: false}}
            />
            <RootStack.Screen name="NeighbourGarden" component={NeighbourGarden} 
                options={{headerShown: false}}
            />
            <RootStack.Screen name="Question" component={Question} 
                options={{headerShown: false}}
            />
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
        <UserProvider>
            <LoginStackNavigator />
        </UserProvider>
    );
}