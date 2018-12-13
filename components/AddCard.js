import React, { Component } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { addCard } from '../actions'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create new card',
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
    question: '',
    answer: ''
  }
  onTextQuestionChange = (text) => {
    if(text) {
      this.setState(() => (
        {
          question: text
        }
      ))
    }
  }
  onTextAnswerChange = (text) => {
    if(text) {
      this.setState(() => (
        {
          answer: text
        }
      ))
    }
  }
  submit = () => {
    const title = this.props.navigation.state.params.deckTitle
    const { dispatch, navigation } = this.props
    const { question, answer } = this.state
    
    Keyboard.dismiss()

    dispatch(addCard(title, {question, answer}))
    
    navigation.goBack()
  }
  render() {
    const { question, answer } = this.state
    const { navigation } = this.props

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Text>Question</Text>
          <TextInput
            onChangeText={this.onTextQuestionChange}
            style={styles.textInput}
            value={question}
          />
          <Text>Answer</Text>
          <TextInput
            onChangeText={this.onTextAnswerChange}
            style={styles.textInput}
            value={answer}
          />
          <TouchableOpacity
            disabled={!question || !answer}
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={this.submit}
          >
            <Text style={{ color: 'white' }}>ADD</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: '#000',
    marginBottom: 16,
    paddingTop: 4,
    paddingBottom: 4,
  },
  button: {
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    marginTop: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 100,
    paddingRight: 100,
    justifyContent: 'center',
  },
})

export default connect(state => state)(AddCard)