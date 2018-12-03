import { ADD_DECK } from '../actions'
import { ADD_CARD } from '../actions'
import { GET_DECKS } from '../actions'

const initialState = {
  decks: {}
}

function Deck(state = initialState, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            title: action.title,
            questions: [],
          },
        },
      }
    case ADD_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            ...state.decks[action.title],
            questions: [...state.decks[action.title].questions, action.card]
          },
        },
      }
    default:
      return state
  }
}

export default Deck