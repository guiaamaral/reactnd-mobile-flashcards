import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.state.params.deckTitle
    return {
      title: `${title}`,
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: '#fff',
    }
  }
  render() {
    const {decks, navigation} = this.props
    const title = navigation.state.params.deckTitle
    const cards = navigation.state.params.deckCards

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={{ fontSize: 24 }}>{title}</Text>
          <Text style={{ fontSize: 14, color: '#666' }}>
            {cards}
            {cards > 1
              ? ' cards'
              : ' card'
            }
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, { borderColor: 'gray', backgroundColor: 'white' }]}
            onPress={() => navigation.navigate()}
          >
            <Text>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#224D17', backgroundColor: 'green' }]}
            onPress={() => navigation.navigate()}
          >
            <Text>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  info: {
    alignItems: 'center',
    paddingTop: 150,
    paddingBottom: 150
  },
  button: {
    borderWidth: 2,
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 100,
    paddingRight: 100,
    marginBottom: 16,
    justifyContent: 'center',
  },
})