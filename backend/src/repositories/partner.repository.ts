import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Partner, PartnerRelations} from '../models';

export class PartnerRepository extends DefaultCrudRepository<
  Partner,
  typeof Partner.prototype.id,
  PartnerRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Partner, dataSource);
  }
}
