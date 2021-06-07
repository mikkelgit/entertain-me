import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import { favoritesShow } from '../graphql/vars'
import FavoriteCard from '../components/FavoriteCard'
import LottieView from 'lottie-react-native'
import { FlatList } from 'react-native-gesture-handler'

const options = ['Movie', 'Series']

export default function Favorite() {
    const [currentTab, setCurrentTab] = useState('Movie')
    const favShows = useReactiveVar(favoritesShow)
    // const favSeries = useReactiveVar(favoritesSeries)

    return (
        <View style={{ backgroundColor: '#000', flex: 1 }} >
            <View>
                <View style={styles.tabsContainer} >
                    <View style={styles.tabsContainerChild} >
                        {
                            options.map((item, i) => {
                                return (
                                    <TouchableOpacity key={i} style={currentTab === item ? styles.activeTabs : styles.textContainer} onPress={() => setCurrentTab(item)} >
                                        <Text style={currentTab === item ? styles.activeTabsText : styles.tabsText} >{item}</Text>
                                    </TouchableOpacity>
                                        )
                                    })
                        }
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, paddingBottom: 160 }} >
                    {
                        favShows.filter(item => item.__typename === currentTab).length ? (
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item._id}
                                data={favShows.filter(item => item.__typename === currentTab)}
                                renderItem={({ item }) => (
                                    <FavoriteCard shows={item} />
                                )}
                            />
                        ) : (
                            <View style={{ height: 210, marginTop: 75 }}>
                                <View style={{ width: '100%', height: '100%', alignItems: 'center', opacity: 0.5 }}>
                                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} >Data is Empty</Text>
                                    <LottieView source={require('../../assets/lottie/53200-empty-file.json')} autoPlay loop />
                                </View>
                            </View>
                        )
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    tabsContainerChild: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(57, 58, 69, 0.5)'
    },
    tabsText: {
        color: '#e6e6e6',
        fontSize: 21,
        opacity: 0.3
    },
    activeTabsText: {
        color: '#e6e6e6',
        fontSize: 21
    },
    activeTabs: {
        backgroundColor: 'rgba(51, 53, 67, 1)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 12,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})