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
    index: 0,
    correctAnswer: 0,
    showQuestion: true
  }
  render() {
    const { navigation } = this.props
    const { index, correctAnswer, showQuestion } = this.state
    const title = navigation.state.params.deckTitle
    const cards = navigation.state.params.deckCards

    return (
      <View style={styles.container}>
        {cards.length > index
        ? <View style={styles.container}>
          <View style={[styles.container, { flex: 9 }]}>
            {showQuestion
            ? <View style={styles.item}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 11 }}>Question:</Text>
                <Text style={{ justifyContent: 'center', fontSize: 16 }}>{cards[index].question}</Text>
                <View style={[styles.btns, { justifyContent: 'center' }]}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() => this.setState({ showQuestion: false })}>
                    <Text style={{ color: 'white' }}>SHOW ANSWER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            : <View style={styles.item}>
                <Text style={{ justifyContent: 'center', fontSize: 16 }}>{cards[index].answer}</Text>
                <View style={styles.btns}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red', marginLeft: 0 }]}
                    onPress={() => this.setState({
                      index: index + 1,
                      showQuestion: true
                   })}>
                    <Text style={{ color: 'white' }}>INCORRECT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() => this.setState({
                      index: index + 1,
                      correctAnswer: correctAnswer + 1,
                      showQuestion: true
                    })}>
                    <Text style={{ color: 'white' }}>CORRECT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>Question {index + 1} of {cards.length}</Text>
          </View>
        </View>
        : <View style={[styles.container, { alignItems: 'center' }]}>
            <Text>You got {correctAnswer} out of {index} questions.</Text>
            <View style={styles.btns}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'red', marginLeft: 0 }]}
                onPress={() => this.setState({
                  index: 0,
                  correctAnswer: 0,
                  showQuestion: true
               })}>
                <Text style={{ color: 'white' }}>START AGAIN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'green' }]}
                onPress={() => navigation.navigate('DeckDetail', {
                  deckTitle: title,
                  deckCardse: cards.length,
                })}>
                <Text style={{ color: 'white' }}>BACK TO DECK</Text>
              </TouchableOpacity>
            </View>
        </View>
        }
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#FFF',
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  btns: {
    marginTop: 40,
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