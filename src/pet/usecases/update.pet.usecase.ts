import { Inject, Injectable } from "@nestjs/common";
import CreatePetUseCaseInput from "./dtos/create.pet.usecase.input";
import { IUseCase } from "src/domain/iusecase.interface";
import CreatePetUseCaseOutput from "./dtos/create.pet.usecase.output";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import UpdatePetUseCaseInput from "./dtos/update.pet.usecase.input";
import UpdatePetUseCaseOutput from "./dtos/update.pet.usecase.output";

@Injectable()
export default class UpdatePetUseCase implements IUseCase<UpdatePetUseCaseInput, UpdatePetUseCaseOutput>{

	constructor(
		@Inject(PetTokens.petRepository)
		private readonly petRepository: IPetRepository
	){}


	async run(input: UpdatePetUseCaseInput): Promise<UpdatePetUseCaseOutput>{
		const newPet = await this.petRepository.create(input)
		return new UpdatePetUseCaseOutput({
			id: newPet._id,
			name: newPet.name,
			type: newPet.type,
			size: newPet.size,
			gender: newPet.gender,
			bio: newPet.bio,
			photo: newPet.photo,
			createdAt: newPet.createdAt,		
			updatedAt: newPet.updatedAt
		})
	}
}