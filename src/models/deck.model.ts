import {Entity, model, property} from '@loopback/repository';

import {Card} from './card.model';

enum Type {
  FULL = 'FULL',
  SHORT = 'SHORT',
}

@model()
export class Deck extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuidv4',
  })
  deckId: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Type),
    },
  })
  type: Type;

  @property({
    type: 'boolean',
    required: true,
  })
  shuffled: boolean;

  @property({
    type: 'number',
    required: false,
  })
  remaining?: number;

  @property.array(Card)
  cards?: Card[]


  constructor(data?: Partial<Deck>) {
    super(data);
  }
}

export interface DeckRelations {
}

export type DeckWithRelations = Deck & DeckRelations;
