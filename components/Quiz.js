import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.state.params.deckTitle
    return {
      title: `Quiz about ${title}`,
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#fff',
    }
  }
  state = {
    index: 0
  }
  render() {
    const { navigation } = this.props
    const { index } = this.state
    const title = navigation.state.params.deckTitle
    const cards = navigation.state.params.deckCards

    return (
      <View style={styles.container}>
        <View style={[styles.container, { flex: 9 }]}>
          <Text>The cards go here</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>Question {index + 1} of {cards.length}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 100,
    paddingRight: 100,
    marginBottom: 16,
    justifyContent: 'center',
  },
})