import React, { Component } from 'react'
import { Button, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { getDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { Entypo } from '@expo/vector-icons'

class DeckList extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: 'FlashCards',
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
    ready: false,
  }
  async componentDidMount() {
    const { dispatch } = this.props
    fetchDecks()
      .then((decks) => dispatch(getDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }
  render() {
    const { ready } = this.state
    const { decks } = this.props

    if (ready === false) {
      return <AppLoading />
    }

    if (!decks) {
      return (
        <View style={styles.container}>
          <Text>No decks found</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deck => (
          <View key={deck} style={styles.item}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('DeckDetail', {
                  deckTitle: this.props.decks[deck].title,
                  deckCards: this.props.decks[deck].questions.length,
                })}
            >
              <Text style={{ fontSize: 24 }}>{decks[deck].title}</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>
                {decks[deck].questions.length}
                {decks[deck].questions.length > 1
                  ? ' cards'
                  : ' card'
                }
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <Entypo
          name="add-to-list"
          size={32}
          style={styles.add}
          onPress={() => this.props.navigation.navigate('AddDeck')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: '#FFF',
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  add: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 30,
    color: 'white',
    justifyContent: 'center',
    height: 52,
    paddingTop: 10,
    paddingLeft: 12,
    width: 52,
    bottom: 30,
    position: 'absolute',
    right: 30,
  }
})

export default connect(state => state)(DeckList)