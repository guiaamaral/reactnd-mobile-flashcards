import React, { Component } from 'react'
import { Platform, View, StatusBar, StyleSheet } from 'react-native'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import thunk from 'redux-thunk'

const HeaderBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList
  },
  AddDeck: {
    screen: AddDeck
  },
  DeckDetail: {
    screen: DeckDetail
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={styles.container}>
          <HeaderBar backgroundColor="#008ECC" barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});