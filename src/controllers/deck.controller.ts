import {service} from '@loopback/core';
import {
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  requestBody,
  response,
} from '@loopback/rest';

import {Deck} from '../models';
import {DeckRepository} from '../repositories';
import {DeckService} from '../services';

export class DeckController {
  constructor(
    @repository(DeckRepository)
    public deckRepository : DeckRepository,
    @service(DeckService)
    public deckService: DeckService,
  ) {}

  @post('/decks')
  @response(200, {
    description: 'Create new card deck',
    content: {
      'application/json': {
        schema: getModelSchemaRef(
          Deck,
          {
            exclude: ['cards']
          }
        ),
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck, {
            title: 'NewDeck',
            exclude: ['cards', 'deckId', 'remaining'],
          }),
        },
      },
    })
    deck: Omit<Deck, 'deckId'>,
  ): Promise<Deck> {
    return this.deckService.createDeck(deck);
  }

  @get('/decks/{id}')
  @response(200, {
    description: 'Deck model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deck)
      },
    },
  })
  async findById(
    @param.path.string('id') id: string
  ): Promise<Deck> {
    const deck = await this.deckRepository.findById(id);
    deck.remaining = deck.cards?.length;

    return deck;
  }

  @get('/decks/{id}/cards')
  @response(200, {
    description: 'Deck model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Deck),
      },
    },
  })
  async findCardsByDeckId(
    @param.path.string('id') id: string
  ): Promise<Partial<Deck>> {
    const deck = await this.deckRepository.findById(id);

    return {
      cards: deck.cards,
    };
  }
}
