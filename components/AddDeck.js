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
      title: 'FlashCards',
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
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Deck title:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={this.onTextChange}
            value={title}
          />
          <TouchableOpacity
            disabled={!title}
            style={[styles.button, { backgroundColor: '#008ECC' }]}
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
    borderBottomWidth: 1,
    borderColor: '#333333',
    marginBottom: 42,
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

export default connect()(AddDeck)