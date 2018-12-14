import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.state.params.deckTitle
    return {
      title: `${title}`,
      headerStyle: {
        backgroundColor: '#008ECC',
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
    const cards = this.props.decks[title].questions

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={{ fontSize: 24 }}>{title}</Text>
          <Text style={{ fontSize: 14, color: '#666' }}>
            {cards.length}
            {cards.length > 1
              ? ' cards'
              : ' card'
            }
          </Text>
        </View>
        {cards.length === 0
          ? <View>
            <TouchableOpacity
              style={[styles.button, { alignItems: 'center', marginLeft: 0, borderColor: 'gray', backgroundColor: 'white' }]}
              onPress={() => navigation.navigate('AddCard', {
                deckTitle: title
              })}
            >
              <FontAwesome
                name="plus"
                size={16}
                color={'white'}
              />
              <Text style={{ marginLeft: 4 }}>ADD CARD</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Text>Add some cards to play Quiz</Text>
            </View>
          </View>
          : <View style={styles.btns}>
            <TouchableOpacity
              style={[styles.button, { marginLeft: 0, borderColor: 'gray', backgroundColor: 'white' }]}
              onPress={() => navigation.navigate('AddCard', {
                deckTitle: title
              })}
            >
              <FontAwesome
                name="plus"
                size={16}
                color={'black'}
              />
              <Text style={{ marginLeft: 4 }}>ADD CARD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#008ECC' }]}
              onPress={() => navigation.navigate('Quiz', {
              deckTitle: title,
              deckCards: cards
            })}
            >
              <FontAwesome
                name="play"
                size={16}
                color={'white'}
              />
              <Text style={{ marginLeft: 4, color: 'white' }}>START QUIZ</Text>
            </TouchableOpacity>
          </View>
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    padding: 16,
    marginLeft: 16,
    justifyContent: 'center'
  },
})

export default connect(state => state)(DeckDetail)