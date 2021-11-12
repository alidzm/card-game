import {Model, model, property} from '@loopback/repository';

export enum Suit {
  HEARTS = 'HEARTS',
  DIAMONDS = 'DIAMONDS',
  SPADES = 'SPADES',
  CLUBS = 'CLUBS',
}

export const VALUES = ['ACE', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING'];

@model()
export class Card extends Model {
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: VALUES,
    },
  })
  value: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Suit),
    },
  })
  suit: Suit;

  @property({
    type: 'string',
    required: true,
  })
  code: string;


  constructor(data?: Partial<Card>) {
    super(data);
  }
}

export interface CardRelations {
  // describe navigational properties here
}

export type CardWithRelations = Card & CardRelations;
