import {injectable, /* inject, */ BindingScope} from '@loopback/core';

import {
  Card,
  Suit,

  VALUES,
} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class CardService {
  constructor(/* Add @inject to inject parameters */) {}

  generateCardSet(shuffled: boolean): Card[] {
    const suits = Object.values(Suit);
    const unshuffledCards = VALUES.reduce((acc: Card[], value) => {
      acc.push(...suits.map((suit) => new Card({
        value,
        suit: Suit[suit],
        code: `${value[0]}${suit[0]}`,
      })));

      return acc;
    }, []);

    if (shuffled) {
      return CardService.shuffleCards(unshuffledCards)
    }

    return unshuffledCards;
  }

  private static shuffleCards(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }

    return cards;
  }
}
