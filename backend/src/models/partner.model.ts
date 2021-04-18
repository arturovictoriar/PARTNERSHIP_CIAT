import {Entity, model, property} from '@loopback/repository';

@model()
export class Partner extends Entity {
  @property({
    type: 'string',
  })
  acronym: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  @property({
    type: 'string',
    required: true,
  })
  type?: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
  })
  partner_url: string;

  @property({
    type: 'string',
    required: true,
  })
  headquarter: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Partner>) {
    super(data);
  }
}

export interface PartnerRelations {
  // describe navigational properties here
}

export type PartnerWithRelations = Partner & PartnerRelations;
