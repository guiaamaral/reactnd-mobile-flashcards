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
import { addDeck } from '../actions'

class AddDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create new deck',
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
    title: ''
  }
  onTextChange = (text) => {
    if(text) {
      this.setState(() => (
        {
          title: text
        }
      ))
    }
  }
  submit = () => {
    const { title } = this.state

    Keyboard.dismiss()

    this.props.dispatch(addDeck(title))
    this.props.navigation.goBack()
  }
  render() {
    const { title } = this.state
    const { navigate } = this.props.navigation

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Text>Title</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onTextChange}
            value={title}
          />
          <TouchableOpacity
            disabled={!title}
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

export default connect()(AddDeck)