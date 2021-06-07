import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home'
import Detail from '../screens/Detail'
import Add from '../screens/Add'
import Edit from '../screens/Edit'

const Stack = createStackNavigator()

export default function HomeStack() {
    return (
        <View style={{ backgroundColor: '#000', flex: 1 }} >
            <Stack.Navigator headerMode="none">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Detail" component={Detail} />
                    <Stack.Screen name="Add" component={Add} />
                    <Stack.Screen name="Edit" component={Edit} />
            </Stack.Navigator>
        </View>
    )
}
