import { ShelterModule } from './shelter.module';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Shelter } from './schemas/shelter.schemas';
import IShelterRepository from './interfaces/shelter.reporitory.interfaces';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ShelterRepository implements IShelterRepository {
  constructor(
	@InjectModel(Shelter.name) 
	private shelterModel: Model<Shelter>
	) {}

	async get(): Promise<Shelter> {
  		return await this.shelterModel.findOne();
	}

	async update(data: Partial<Shelter>): Promise<void> {
		await this.shelterModel.updateOne(null, {
			...data,
			updateAt: new Date()
		}) 
	}

	
}
