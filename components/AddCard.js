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
        backgroundColor: '#008ECC',
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
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Question:</Text>
          <TextInput
            onChangeText={this.onTextQuestionChange}
            style={styles.textInput}
            value={question}
          />
          <Text>Answer:</Text>
          <TextInput
            onChangeText={this.onTextAnswerChange}
            style={[styles.textInput, { marginBottom: 42 }]}
            value={answer}
          />
        </View>
        <TouchableOpacity
          disabled={!question || !answer}
          style={[styles.button, { backgroundColor: '#008ECC' }]}
          onPress={this.submit}
        >
          <Text style={{ color: 'white' }}>ADD</Text>
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderColor: '#333333',
    marginBottom: 24,
    paddingTop: 4,
    paddingBottom: 4,
    width: 250
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    paddingBottom: 16,
    paddingLeft: 60,
    paddingRight: 60,
    paddingTop: 16,
    marginLeft: 16,
    justifyContent: 'center',
  },
})

export default connect(state => state)(AddCard)