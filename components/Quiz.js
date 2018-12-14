import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons'

export default class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.state.params.deckTitle
    return {
      title: `Quiz about ${title}`,
      headerStyle: {
        backgroundColor: '#008ECC',
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
                <Text style={{ color: '#008ECC', fontWeight: 'bold', fontSize: 11, marginBottom: 12 }}>Question</Text>
                <Text style={{ justifyContent: 'center', fontSize: 16 }}>{cards[index].question}</Text>
                <View style={[styles.btns, { justifyContent: 'center' }]}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#008ECC' }]}
                    onPress={() => this.setState({ showQuestion: false })}>
                    <FontAwesome
                      name="eye"
                      size={16}
                      color={'white'}
                    />
                    <Text style={{ marginLeft: 4, color: 'white' }}>SHOW ANSWER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            : <View style={styles.item}>
                <Text style={{ color: '#008ECC', fontWeight: 'bold', fontSize: 11, marginBottom: 12 }}>Answer</Text>
                <Text style={{ justifyContent: 'center', fontSize: 16 }}>{cards[index].answer}</Text>
                <View style={styles.btns}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'red', paddingLeft: 18, paddingRight: 18, marginLeft: 0 }]}
                    onPress={() => this.setState({
                      index: index + 1,
                      showQuestion: true
                   })}>
                    <FontAwesome
                      name="times"
                      size={16}
                      color={'white'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'green' }]}
                    onPress={() => this.setState({
                      index: index + 1,
                      correctAnswer: correctAnswer + 1,
                      showQuestion: true
                    })}>
                    <FontAwesome
                      name="check"
                      size={16}
                      color={'white'}
                    />
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
            {(correctAnswer / index) * 100 < 50
              ? <Entypo
                name='emoji-sad'
                size={42}
                color={'#AAA'}
                style={{ marginBottom: 24 }}
              />
              : <Entypo
                name='emoji-happy'
                size={42}
                color={'#AAA'}
                style={{ marginBottom: 24 }}
              />
            }
            <Text>You got {correctAnswer} out of {index} questions.</Text>
            <View style={styles.btns}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#008ECC', marginLeft: 0 }]}
                onPress={() => navigation.navigate('DeckDetail', {
                  deckTitle: title,
                  deckCardse: cards.length,
                })}>
                <FontAwesome
                  name="chevron-left"
                  size={16}
                  color={'white'}
                />
                <Text style={{ marginLeft: 4, color: 'white' }}>BACK TO DECK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#008ECC' }]}
                onPress={() => this.setState({
                  index: 0,
                  correctAnswer: 0,
                  showQuestion: true
               })}>
                <FontAwesome
                  name="undo"
                  size={16}
                  color={'white'}
                />
                <Text style={{ marginLeft: 4, color: 'white' }}>START AGAIN</Text>
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
    marginLeft: 24,
    marginRight: 24,
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
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    padding: 16,
    marginLeft: 16,
    justifyContent: 'center'
  },
})