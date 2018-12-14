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
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Constants } from 'expo'
import thunk from 'redux-thunk'
import { FontAwesome } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'

const HeaderBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="list" size={28} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus" size={28} color={tintColor} />
    },
  }
}, {
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: '#73C2FB',
    },
    activeTintColor: Platform.OS === 'ios' ? '#008ECC' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : '#008ECC',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
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
    componentDidMount() {
        setLocalNotification();
    }
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