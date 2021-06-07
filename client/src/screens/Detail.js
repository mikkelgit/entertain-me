import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import { useQuery, useReactiveVar } from '@apollo/client'
import { GET_MOVIE_DETAIL, GET_SERIES_DETAIL } from '../graphql/queries'
import { LinearGradient } from 'expo-linear-gradient'
import DetailHeadersNav from '../components/DetailHeadersNav'
import { favoritesShow } from '../graphql/vars'
import TagsCard from '../components/TagsCard'
import LottieView from 'lottie-react-native'

export default function Detail({ route }) {
    const { itemId, type } = route.params
    const favShows = useReactiveVar(favoritesShow)

    let receivedData
    let showsDetail
    if (type === 'Movie') {
        receivedData = useQuery(GET_MOVIE_DETAIL, {
            variables: { id: itemId }
        })
        if (receivedData.data) {
            showsDetail = receivedData.data.findMovie
        }
    } else if (type === 'Series' ) {
        receivedData = useQuery(GET_SERIES_DETAIL, {
            variables: { id: itemId }
        })
        if (receivedData.data) {
            showsDetail = receivedData.data.findSeries
        }
    }

    if (receivedData.loading) {
        return (
            <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '35%', height: '100%' }}>
                    <LottieView source={require('../../assets/lottie/1562-play-button.json')} autoPlay loop />
                </View>
            </View>
        )
    }

    if (receivedData.error) {
        return (
            <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 32, color: '#e6e6e6' }}>{JSON.stringify(receivedData.error?.message || receivedData.error)}</Text>
            </View>
        )
    }

    const addToFavorites = () => {
        const currentData = favoritesShow()
        favoritesShow([...currentData, showsDetail])
    }

    return (
        <ScrollView style={styles.container} >
            <ImageBackground
            source={{
                uri: showsDetail.poster_path
            }}
            resizeMode="cover"
            style={{
                width: '100%',
                height: 480
            }}
            >
                <View>
                    <DetailHeadersNav id={ itemId } type={ type } detail={ showsDetail } />
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end'
                }} >
                <LinearGradient
                start={{ x:0, y:0 }}
                end={{ x:0, y:1 }}
                colors={[ 'transparent', '#000' ]}
                style={{
                    width: '100%',
                    height: 150,
                    justifyContent: 'flex-end'
                }}
                >
                    <View style={{ alignItems: 'center' }} >
                        <Text style={{ color: '#e6e6e6', fontSize: 32, fontWeight: 'bold', textAlign: 'center' }} >{showsDetail.title}</Text>
                        <View style={{ flexDirection: 'row' }} >
                            {
                                showsDetail.tags.map((el, i) => <TagsCard key={i} item={el} /> )
                            }
                        </View>
                    </View>
                </LinearGradient>
                </View>
            </ImageBackground>
            <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                {
                    favShows.some(item => item._id === itemId) ? (
                        <View style={{ backgroundColor: '#db0000', padding: 7, marginVertical: 10, borderRadius: 8, flex: 1, alignItems: 'center', opacity: 0.5 }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#e6e6e6' }} >Added To Favorites</Text>
                        </View>

                    ) : (
                        <TouchableOpacity onPress={() => addToFavorites()} style={{ backgroundColor: '#db0000', padding: 7, marginVertical: 10, borderRadius: 8, flex: 1, alignItems: 'center' }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#e6e6e6' }} >Add To Favorite</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={{ paddingHorizontal: 15, justifyContent: 'space-between' }} >
                <Text style={{ color: '#e6e6e6', fontSize: 18, marginBottom: 10 }} >
                    {showsDetail.overview}
                </Text>
                <Text style={{ color: '#e6e6e6', fontSize: 18, opacity: 0.5, fontWeight: 'bold' }} >Popularity : {showsDetail.popularity}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1
    }
})