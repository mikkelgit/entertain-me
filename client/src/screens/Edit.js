import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import Tags from '../components/Tags'
import { useMutation } from '@apollo/client'
import { EDIT_MOVIE, EDIT_SERIES } from '../graphql/mutations'
import { GET_MOVIE_DETAIL, GET_SERIES_DETAIL } from '../graphql/queries'
import { favoritesShow } from '../graphql/vars'

export default function Edit({ route }) {
    const {
        __typename,
        _id,
        title,
        overview,
        popularity,
        poster_path,
        tags
    } = route.params.detail
    const navigation = useNavigation()

    const [editMovie, { editMovieRes }] = useMutation(EDIT_MOVIE, {
        refetchQueries: [{
            query: GET_MOVIE_DETAIL,
            variables: { id: _id }
        },
    ],
        onCompleted: () => {
            syncFavData()
            navigation.goBack()
        }
    })

    const [editSeries, { editSeriesRes }] = useMutation(EDIT_SERIES, {
        refetchQueries: [{
            query: GET_SERIES_DETAIL,
            variables: { id: _id }
        }],
        onCompleted: () => {
            syncFavData()
            navigation.goBack()
        }
    })

    const syncFavData = () => {
        const currentFavs = favoritesShow()
        const dataInput = {
            title: showsTitle,
            overview: showsOverview,
            poster_path: showsImage,
            popularity: +showsPopularity,
            tags: showsGenres
        }
        if (currentFavs.some(item => item._id === _id)) {
            const newFavs = currentFavs.map(item => {
                if (item._id === _id) {
                    return { ...item, ...dataInput }
                }
                return item
            })
            favoritesShow(newFavs)
        }
    }

    const [showsTitle, setShowsTitle] = useState(title)
    const [showsOverview, setShowsOverview] = useState(overview)
    const [showsImage, setShowsImage] = useState(poster_path)
    const [showsPopularity, setShowsPopularity] = useState(popularity.toString())
    const [showsGenres, setShowsGenres] = useState(tags)
    const [invalidInput, setInvalidInput] = useState(false)

    const handleEdit = () => {
        const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)/i
        const validImageFormat = regex.test(showsImage)
        if (!showsTitle || !showsOverview || !validImageFormat || !Number(showsPopularity) || !showsGenres.length) {
            setInvalidInput(true)
        } else {
            if (__typename === 'Movie') {
                editMovie({
                    variables: {
                        id: _id,
                        dataInput: {
                            title: showsTitle,
                            overview: showsOverview,
                            poster_path: showsImage,
                            popularity: +showsPopularity,
                            tags: showsGenres
                        }
                    }
                })
            } else if (__typename === 'Series') {
                editSeries({
                    variables: {
                        id: _id,
                        dataInput: {
                            title: showsTitle,
                            overview: showsOverview,
                            poster_path: showsImage,
                            popularity: +showsPopularity,
                            tags: showsGenres
                        }
                    }
                })
            }
        }
    }
    
    return (
        <View style={{ backgroundColor: '#000', flex: 1 }} >
            <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 3, paddingHorizontal: 15, borderBottomColor: '#db0000', paddingVertical: 10 }} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent: 'center', alignItems: 'center', borderRadius: 12, padding: 10 }} >
                    <MaterialIcons name="keyboard-arrow-left" size={24} color="#e6e6e6" />
                </TouchableOpacity>
                <Text style={{ color: '#e6e6e6', fontSize: 24, marginLeft: 15, fontWeight: 'bold' }} >Edit {__typename}</Text>
            </View>
            <ScrollView style={{ paddingVertical: 20, paddingHorizontal: 15 }} keyboardShouldPersistTaps="always" >
                <View style={{ marginBottom: 10 }} >
                    <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Title</Text>
                    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, marginTop: 10 }} >
                        <TextInput onChangeText={text => setShowsTitle(text)} value={showsTitle} />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }} >
                    <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Overview</Text>
                    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, marginTop: 10 }} >
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            onChangeText={text => setShowsOverview(text)}
                            value={showsOverview}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }} >
                    <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Poster Image URL</Text>
                    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, marginTop: 10 }} >
                        <TextInput onChangeText={text => setShowsImage(text)} value={showsImage} />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }} >
                    <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Popularity</Text>
                    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, marginTop: 10 }} >
                        <TextInput onChangeText={text => setShowsPopularity(text)} value={showsPopularity} keyboardType='number-pad' />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Genre</Text>
                        <Text style={{ color: '#e6e6e6', fontSize: 16, marginLeft: 10, opacity: 0.8 }} >(up to 3 Genre)</Text>
                    </View>
                    <Tags selected={showsGenres} setSelected={setShowsGenres} />
                </View>
                <View style={{ marginTop: 25, marginBottom: 50 }} >
                    {
                        invalidInput ? (
                            <View style={{ justifyContent:'center', alignItems: 'center', marginBottom: 10 }} >
                                <Text style={{ color: '#db0000', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }} >Form cannot be empty and must be in valid format</Text>
                            </View>
                        ) : null
                    }
                    <TouchableOpacity onPress={() => handleEdit()} style={{ backgroundColor: '#db0000', padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }} >
                        <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: 'bold' }} >
                            Edit {__typename}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
