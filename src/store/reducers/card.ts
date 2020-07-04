// src/store/reducers/chat.ts
import { AnyAction, Reducer } from 'redux';

import {
  CardState,
  FLIP_CARD,
  MOVE_CARD,
  CREATE_CARD
} from '../types/card'

const initialState: CardState = {
  cards: []
}

const cards : Reducer<CardState, AnyAction> = ( state = initialState, action: AnyAction ): CardState => {
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
