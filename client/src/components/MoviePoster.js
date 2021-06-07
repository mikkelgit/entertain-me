import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function MoviePoster({ item }) {
    const navigation = useNavigation()
    return (
        <View style={{ marginRight: 10 }} >
            <TouchableOpacity onPress={() => navigation.push('Detail', {
                itemId: item._id,
                type: item.__typename
            })} style={styles.imageContainer} >
                <Image
                style={styles.imageStyle}
                source={{
                    uri: item.poster_path,
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 7,
        overflow: 'hidden'
    },
    imageStyle: {
        width: 150,
        height: 210
    }
})