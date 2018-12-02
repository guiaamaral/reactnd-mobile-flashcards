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
    default:
      return state;
  }
}

export default Deck