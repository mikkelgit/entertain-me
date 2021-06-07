import React from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { useQuery } from '@apollo/client'
import { GET_HOMEPAGE_DATA } from '../graphql/queries'
import MoviePoster from '../components/MoviePoster'
import LottieView from 'lottie-react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
    const navigation = useNavigation()
    const { loading, error, data } = useQuery(GET_HOMEPAGE_DATA)

    if (loading) {
        return (
            <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '35%', height: '100%' }}>
                    <LottieView source={require('../../assets/lottie/1562-play-button.json')} autoPlay loop />
                </View>
            </View>
        )
    }

    if (error) {
        return (
            <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 32, color: '#e6e6e6' }}>{JSON.stringify(error)}</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container} >
            <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                <Image source={require('../../assets/img/logo.png')} style={{ maxWidth: 250, resizeMode: 'contain' }} />
            </View>
            <View style={styles.typeHeader} >
                <Text style={styles.text} >Movies</Text>
                <TouchableOpacity onPress={() => navigation.push('Add', {
                    type: 'Movie'
                })} style={styles.typeContentContainer} >
                    <MaterialIcons name="movie" size={24} color='#e6e6e6' />
                    <Text style={styles.typeAddText} >Add Movie</Text>
                </TouchableOpacity>
            </View>
            {
                data.movies.length ? (
                    <FlatList
                        style={styles.posterContainer}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item._id}
                        data={data.movies}
                        renderItem={({ item }) => (
                            <MoviePoster item={item}/>
                        )}
                    />
                ) : (
                    <View style={styles.posterContainer} >
                        <View style={{ width: '100%', height: '100%', alignItems: 'center', opacity: 0.5 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} >Movies Data is Empty</Text>
                            <LottieView source={require('../../assets/lottie/53200-empty-file.json')} autoPlay loop />
                        </View>
                    </View>
                )
            }
            <View style={styles.typeHeader} >
                <Text style={styles.text} >Series</Text>
                <TouchableOpacity onPress={() => navigation.push('Add', {
                    type: 'Series'
                })} style={styles.typeContentContainer} >
                    <MaterialIcons name="tv" size={24} color='#e6e6e6' />
                    <Text style={styles.typeAddText} >Add Series</Text>
                </TouchableOpacity>
            </View>
            {
                data.series.length ? (
                    <FlatList
                        style={styles.posterContainer}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item._id}
                        data={data.series}
                        renderItem={({ item }) => (
                            <MoviePoster item={item}/>
                        )}
                    />
                ) : (
                    <View style={styles.posterContainer} >
                        <View style={{ width: '100%', height: '100%', alignItems: 'center', opacity: 0.5 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} >Series Data is Empty</Text>
                            <LottieView source={require('../../assets/lottie/53200-empty-file.json')} autoPlay loop />
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1
    },
    text: {
        color: '#e6e6e6',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 7
    },
    posterContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        height: 210,
        marginBottom: 10
    },
    typeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20,
        alignItems: 'center'
    },
    typeContentContainer: {
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: '#e6e6e6',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        padding: 5
    },
    typeAddText: {
        color: '#e6e6e6',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 7
    }
})