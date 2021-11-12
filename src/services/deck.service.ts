import {BindingScope, injectable, service} from '@loopback/core';
import {
  repository,
} from '@loopback/repository';

import {Deck} from '../models';
import {DeckRepository} from '../repositories';
import {CardService} from './card.service';

@injectable({scope: BindingScope.TRANSIENT})
export class DeckService {
  constructor(
    @repository(DeckRepository)
    private deckRepository: DeckRepository,
    @service(CardService)
    private cardService: CardService
  ) {}

  async createDeck(deck: Omit<Deck, 'deckId'>): Promise<Deck> {
    const cards = this.cardService.generateCardSet(deck.shuffled);
    deck.cards = cards;

    const newDeck = await this.deckRepository.create(deck);
    delete newDeck.cards;
    newDeck.remaining = cards.length;

    return newDeck;
  }
}
