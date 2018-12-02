import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { AppLoading } from 'expo'

export default class AddDeck extends Component {
  state = {
    ready: false,
  }
  componentDidMount () {
    this.setState(() => ({ready: true}))
  }
  render() {
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        <Text>Add Deck</Text>
      </View>
    )
  }
}