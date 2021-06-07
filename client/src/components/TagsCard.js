import React from 'react'
import { View, Text } from 'react-native'

export default function TagsCard({ item }) {
    return (
            <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', padding: 5, borderRadius: 5, margin: 5 }}>
                <Text style={{ fontSize: 16, color: '#e6e6e6', fontWeight: 'bold' }} >{item}</Text>
            </View>
    )
}
