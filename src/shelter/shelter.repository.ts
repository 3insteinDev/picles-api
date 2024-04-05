import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shelter } from './schemas/shelter.schemas';
import IShelterRepository from './interfaces/shelter.reporitory.interfaces';



export class ShelterRepository implements IShelterRepository {
  constructor(@InjectModel(Shelter.name) private readonly shelterModel: Model<Shelter>) {}
	get(): Promise<Shelter> {
		throw new Error('Method not implemented.');
	}

  async getShelter(): Promise<Shelter> {
    return await this.shelterModel.findOne();
  }
}
