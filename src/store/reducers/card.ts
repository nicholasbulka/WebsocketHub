// src/store/reducers/chat.ts
import {
  CardState,
  CardActionTypes,
  FLIP_CARD,
  MOVE_CARD,
  CREATE_CARD
} from '../types/card'

const initialState: CardState = {
  cards: []
}

const cards = ( state = initialState, action: CardActionTypes ): CardState => {
  switch (action.type) {
    case FLIP_CARD:
      return {
        cards: state.cards.map( card =>
          card.cardId === action.cardId ? {
            ...card,
            faceUp: action.faceUp,
          } : card
        )
      }
    case MOVE_CARD:
      return {
        cards: state.cards.map( card =>
          card.cardId === action.cardId ? {
            ...card,
            location: action.location,
          } : card
        )
      }
      case CREATE_CARD:
        return {
          cards: [...state.cards, action.card]
        }
    default:
      return state
  }
}

export default cards;
