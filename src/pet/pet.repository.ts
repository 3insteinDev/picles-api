import { InjectModel } from "@nestjs/mongoose";
import IPetRepository from "./interfaces/pet.repository.interface";
import { Injectable } from "@nestjs/common";
import { Pet } from "./schemas/pet.schemas";
import { Model } from "mongoose";

@Injectable()
export default class PetRepository implements IPetRepository{
	constructor(
		@InjectModel(Pet.name)
		private readonly petModel: Model<Pet>,
	){}

	async getById(id: string): Promise<Pet> {
		return await this.petModel.findById(id)
	}

	async create(data: Partial<Pet>):Promise<Pet>{
		return await this.petModel.create({
			...data,
			createdAt: new Date(),
			updateAt: new Date()
		})
	}

	async update(data: Partial<Pet>):Promise<void>{
		await this.petModel.updateOne({
			...data,
			updateAt: new Date()
		})
	}
}