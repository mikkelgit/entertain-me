import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import Tags from '../components/Tags'
import { ADD_MOVIE, ADD_SERIES } from '../graphql/mutations'
import { GET_MOVIES_DATA, GET_SERIES_DATA } from '../graphql/queries'
import { useMutation } from '@apollo/client'

export default function Add({ route }) {
    const { type } = route.params
    const navigation = useNavigation()

    const [createMovie, { createMovieRes }] = useMutation(ADD_MOVIE, {
        refetchQueries: [{
            query: GET_MOVIES_DATA
        }],
        onCompleted: () => {
            navigation.goBack()
        }
    })

    const [createSeries, { createSeriesRes }] = useMutation(ADD_SERIES, {
        refetchQueries: [{
            query: GET_SERIES_DATA
        }],
        onCompleted: () => {
            navigation.goBack()
        }
    })

    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [popularity, setPopularity] = useState('')
    const [genres, setGenres] = useState([])
    const [invalidInput, setInvalidInput] = useState(false)

    const handleSubmit = () => {
        const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp)/i
        const validImageFormat = regex.test(imageUrl)
        if (!title || !overview || !validImageFormat || !Number(popularity) || !genres.length) {
            setInvalidInput(true)
        } else {
            if (type === 'Movie') {
                createMovie({
                    variables: {
                        dataInput: {
                            title: title,
                            overview: overview,
                            poster_path: imageUrl,
                            popularity: +popularity,
                            tags: genres
                        }
                    }
                })
            } else if (type === 'Series') {
                createSeries({
                    variables: {
                        dataInput: {
                            title: title,
                            overview: overview,
                            poster_path: imageUrl,
                            popularity: +popularity,
                            tags: genres
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
                <Text style={{ color: '#e6e6e6', fontSize: 24, marginLeft: 15, fontWeight: 'bold' }} >Add New {type}</Text>
            </View>
            <ScrollView style={{ paddingVertical: 20, paddingHorizontal: 15 }} keyboardShouldPersistTaps="always" >
                <View style={{ marginBottom: 10 }} >
                    <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Title</Text>
                    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, marginTop: 10 }} >
                        <TextInput onChangeText={text => setTitle(text)} value={title} />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }} >
                    <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Overview</Text>
                    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, marginTop: 10 }} >
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            style={{ justifyContent: "flex-start", textAlignVertical: 'top' }}
                            onChangeText={text => setOverview(text)}
                            value={overview}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }} >
                    <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Poster Image URL</Text>
                    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, marginTop: 10 }} >
                        <TextInput onChangeText={text => setImageUrl(text)} value={imageUrl} />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }} >
                    <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Popularity</Text>
                    <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 5, marginTop: 10 }} >
                        <TextInput onChangeText={text => setPopularity(text)} value={popularity} keyboardType='number-pad' />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: '700' }} >Genre</Text>
                        <Text style={{ color: '#e6e6e6', fontSize: 16, marginLeft: 10, opacity: 0.8 }} >(up to 3 Genre)</Text>
                    </View>
                    <Tags selected={genres} setSelected={setGenres} />
                </View>
                <View style={{ marginTop: 25, marginBottom: 50 }} >
                    {
                        invalidInput ? (
                            <View style={{ justifyContent:'center', alignItems: 'center', marginBottom: 10 }} >
                                <Text style={{ color: '#db0000', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }} >Form cannot be empty and must be in valid format</Text>
                            </View>
                        ) : null
                    }
                    <TouchableOpacity onPress={() => handleSubmit()} style={{ backgroundColor: '#db0000', padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }} >
                        <Text style={{ color: '#e6e6e6', fontSize: 18, fontWeight: 'bold' }} >
                            Add {type}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
