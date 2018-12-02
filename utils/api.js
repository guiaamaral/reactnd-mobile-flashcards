import { AsyncStorage } from 'react-native'
import { getAllDecks, DECKS_STORAGE_KEY } from './helpers'

export function fetchDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(getAllDecks)
}