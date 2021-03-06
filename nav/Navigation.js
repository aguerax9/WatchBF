import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../components/Search'; 
import FilmDetail from '../components/FilmDetail';

const Stack = createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator initialRouteName="Recherche">
            <Stack.Screen name="Recherche" component={Search} />
            <Stack.Screen name="Infos" component={FilmDetail} />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return(
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}