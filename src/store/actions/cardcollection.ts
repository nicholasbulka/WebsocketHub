// src/store/actions/card.ts
import { Vec3 } from '../types/util';

import { CardCollection, FLIP_CARD_COLLECTION, MOVE_CARD_COLLECTION, CREATE_CARD_COLLECTION, CardCollectionActionTypes } from '../types/cardcollection';

export function flipCardCollection(cardId: string): CardCollectionActionTypes {
  return {
    type: FLIP_CARD_COLLECTION,
    cardId
  }
}

export function moveCard(cardId: string, location: Vec3): CardCollectionActionTypes {
  return {
    type: MOVE_CARD_COLLECTION,
    cardId,
    location

  }
}

export function createCard(cardCollection: CardCollection): CardCollectionActionTypes {
  return {
    type: CREATE_CARD_COLLECTION,
    cardCollection
  }
}
