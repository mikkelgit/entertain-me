import React from 'react'
import { View, TouchableHighlight } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { REMOVE_MOVIE, REMOVE_SERIES } from '../graphql/mutations'
import { GET_MOVIES_DATA, GET_SERIES_DATA } from '../graphql/queries'
import { useMutation } from '@apollo/client'
import { favoritesShow } from '../graphql/vars'

export default function DetailHeadersNav({ detail }) {
    const {
        __typename,
        _id
    } = detail
    const navigation = useNavigation()
    
    const [deleteMovie, { deleteMovieRes }] = useMutation(REMOVE_MOVIE, {
        refetchQueries: [{
            query: GET_MOVIES_DATA
        }],
        onCompleted: () => {
            syncFavData()
            navigation.goBack()
        }
    })

    const [deleteSeries, { deleteSeriesRes }] = useMutation(REMOVE_SERIES, {
        refetchQueries: [{
            query: GET_SERIES_DATA
        }],
        onCompleted: () => {
            syncFavData()
            navigation.goBack()
        }
    })

    const syncFavData = () => {
        const currentFavs = favoritesShow()
        if (currentFavs.some(item => item._id === _id)) {
            const newFavs = currentFavs.filter(item => item._id !== _id)
            favoritesShow(newFavs)
        }
    }
    
    const deleteData = () => {
        if (__typename === 'Movie') {
            deleteMovie({
                variables: {
                    id: _id
                }
            })
        } else if (__typename === 'Series') {
            deleteSeries({
                variables: {
                    id: _id
                }
            })
        }
    }

    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center' }} >
            <TouchableHighlight onPress={() => navigation.goBack()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent: 'center', alignItems: 'center', borderRadius: 12, padding: 10 }} >
                <MaterialIcons name="keyboard-arrow-left" size={24} color="#e6e6e6" />
            </TouchableHighlight>
            <View style={{ flexDirection: 'row' }} >
                <TouchableHighlight onPress={() => navigation.push('Edit', {
                    detail
                })} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent: 'center', alignItems: 'center', borderRadius: 12, padding: 10, marginHorizontal: 5 }} >
                    <MaterialIcons name="edit" size={24} color="#e6e6e6" />
                </TouchableHighlight>
                <TouchableHighlight onPress={() => deleteData()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent: 'center', alignItems: 'center', borderRadius: 12, padding: 10, marginHorizontal: 5 }} >
                    <MaterialIcons name="delete" size={24} color="#e6e6e6" />
                </TouchableHighlight>
            </View>
        </View>
    )
}
