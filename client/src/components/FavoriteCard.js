import React from 'react'
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { favoritesShow } from '../graphql/vars'
import TagsCard from './TagsCard'

export default function FavoriteCard({ shows }) {
    const removeFromFavs = () => {
        let newData = favoritesShow().filter(item => item._id !== shows._id)
        favoritesShow(newData)
    }

    return (
        <View style={styles.showsContainer}>
            <TouchableHighlight onPress={() => removeFromFavs()} style={styles.deleteButtonContainer} >
                <MaterialIcons name="delete" size={24} color="#e6e6e6" />
            </TouchableHighlight>
            <Image
            style={styles.imageStyle}
            source={{
                uri: shows.poster_path,
                }}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 20, marginRight: 10 }} >
                <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: 'bold' }} >{shows.title}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {
                        shows.tags.map((el, i) => <TagsCard key={i} item={el} /> )
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    showsContainer: {
        backgroundColor: 'rgba(57, 58, 69, 0.5)',
        marginVertical: 10,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 15,
        position: 'relative'
    },
    imageStyle: {
        width: 107,
        height: 150,
        borderRadius: 15,
    },
    deleteButtonContainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        padding: 10,
        marginHorizontal: 5,
        position: 'absolute',
        right: 10,
        top: -10
    }
})