import React from 'react'
import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

const genre = ['Action', 'Adventure', 'Drama', 'Fantasy', 'Horror', 'Others']

export default function Tags({ selected, setSelected }) {

  const handleInput = genre => {
    if (selected.includes(genre)) {
      setSelected( selected.filter(item => item !== genre) )
    } else {
      if (selected.length < 3) {
        setSelected([...selected, genre])
      }
    }
  }

  return (
    <ScrollView horizontal keyboardShouldPersistTaps="always" showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
      {
        genre.map((item, i) => {
          return (
            <TouchableOpacity onPress={() => handleInput(item)} key={i} style={ selected.includes(item) ? styles.active : styles.inActive } >
              <Text style={ selected.includes(item) ? styles.textActive : styles.textInActive } >{item}</Text>
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inActive: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    padding: 7,
    borderRadius: 5,
    marginRight: 10,
  },
  active: {
    backgroundColor: '#db0000',
    padding: 7,
    borderRadius: 5,
    marginRight: 10
  },
  textInActive: {
    color: '#e6e6e6',
    fontSize: 16,
    opacity: 0.5
  },
  textActive: {
    color: '#e6e6e6',
    fontSize: 16,
    fontWeight: 'bold'
  }
})