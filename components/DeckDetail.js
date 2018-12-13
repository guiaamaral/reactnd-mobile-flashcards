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
    const cardsLength = navigation.state.params.deckCardsLength

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={{ fontSize: 24 }}>{title}</Text>
          <Text style={{ fontSize: 14, color: '#666' }}>
            {cardsLength}
            {cardsLength > 1
              ? ' cards'
              : ' card'
            }
          </Text>
        </View>
        <View style={styles.btns}>
          <TouchableOpacity
            style={[styles.button, { marginLeft: 0, borderColor: 'gray', backgroundColor: 'white' }]}
            onPress={() => navigation.navigate('AddCard', {
              deckTitle: title,
              deckCards: cardsLength,
            })}
          >
            <Text>ADD CARD</Text>
          </TouchableOpacity>
          {cardsLength === 0
            ? <View style={{ alignItems: 'center' }}>
                <Text>Add some cards to play Quiz</Text>
            </View>
            : <TouchableOpacity
              style={[styles.button, { backgroundColor: 'green' }]}
              onPress={() => navigation.navigate('Quiz', {
              deckTitle: title,
              deckCards: cards
            })}
            >
              <Text style={{ color: 'white' }}>START QUIZ</Text>
            </TouchableOpacity>
          }
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
  info: {
    alignItems: 'center',
    paddingBottom: 80
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 42,
    paddingRight: 44,
    marginLeft: 16,
    marginBottom: 16,
    justifyContent: 'center',
  },
})