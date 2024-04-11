import { Inject, Injectable } from "@nestjs/common";
import CreatePetUseCaseInput from "./dtos/create.pet.usecase.input";
import { IUseCase } from "src/domain/iusecase.interface";
import CreatePetUseCaseOutput from "./dtos/create.pet.usecase.output";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import UpdatePetUseCaseInput from "./dtos/update.pet.usecase.input";
import UpdatePetUseCaseOutput from "./dtos/update.pet.usecase.output";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schemas/pet.schemas";

@Injectable()
export default class UpdatePetUseCase implements IUseCase<UpdatePetUseCaseInput, UpdatePetUseCaseOutput>{

	constructor(
		@Inject(PetTokens.petRepository)
		private readonly petRepository: IPetRepository
	){}

	async run(input: UpdatePetUseCaseInput): Promise<UpdatePetUseCaseOutput>{
		let pet = await this.getPetById(input.id)

		if(!pet){
			throw new PetNotFoundError()
		}

		await this.petRepository.update({
			...input,
			_id: input.id
		})

		pet = await this.getPetById(input.id)

		return new UpdatePetUseCaseOutput({
			id: pet._id,
			name: pet.name,
			type: pet.type,
			size: pet.size,
			gender: pet.gender,
			bio: pet.bio,
			photo: null,
			createdAt: pet.createdAt,
			updatedAt: pet.updatedAt,
		})
	}

	private async getPetById(id: string): Promise<Pet>{
		try {
			return await this.petRepository.getById(id)
		}catch(error){
			return null
		}
	}


	
}