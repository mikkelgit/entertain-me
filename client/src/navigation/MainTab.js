import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import HomeStack from './HomeStack'
import Favorite from '../screens/Favorite'

const Tab = createMaterialBottomTabNavigator()

export default function MainTab() {
    return (
        <Tab.Navigator
        activeColor='#ffffff'
        inactiveColor='#747474'
        barStyle={{ backgroundColor: '#000' }}
        >
            <Tab.Screen
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="home-filled" size={24} color={color} />
                )
            }}
            name="Main" component={HomeStack} />
            <Tab.Screen
            options={{
                tabBarIcon: ({ color }) => (
                    <MaterialIcons name="favorite" size={24} color={color} />
                )
            }}
            name="Favorite" component={Favorite} />
        </Tab.Navigator>
    )
}
