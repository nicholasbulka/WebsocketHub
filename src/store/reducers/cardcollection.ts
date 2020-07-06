// src/store/reducers/cardcollection.ts

import { AnyAction, Reducer } from 'redux';

import {
  CardCollectionState,
  MOVE_CARD_COLLECTION,
  CREATE_CARD_COLLECTION
} from '../types/cardcollection'

const initialState: CardCollectionState = {
  cardCollections: []
}

const cards : Reducer<CardCollectionState, AnyAction> = ( state = initialState, action: AnyAction ): CardCollectionState => {
  switch (action.type) {
    case MOVE_CARD_COLLECTION:
      return {
        cardCollections: state.cardCollections.map( card =>
          card.itemId === action.cardId ? {
            ...card,
            location: action.location,
          } : card
        )
      }
      case CREATE_CARD_COLLECTION:
        return {
          cardCollections: [...state.cardCollections, action.cardCollection]
        }
    default:
      return state
  }
}

export default cards;
