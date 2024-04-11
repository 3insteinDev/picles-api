import { Inject, Injectable } from "@nestjs/common";
import CreatePetUseCaseInput from "./dtos/create.pet.usecase.input";
import { IUseCase } from "src/domain/iusecase.interface";
import CreatePetUseCaseOutput from "./dtos/create.pet.usecase.output";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import DeletePetUseCaseInput from "./dtos/delete.pet.usecase.input";
import DeletePetUseCaseOutput from "./dtos/delete.pet.usecase.output c";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import { Pet } from "../schemas/pet.schemas";

@Injectable()
export default class DeletePetUseCase implements IUseCase<DeletePetUseCaseInput, DeletePetUseCaseOutput>{

	constructor(
		@Inject(PetTokens.petRepository)
		private readonly petRepository: IPetRepository
	){}


	async run(input: DeletePetUseCaseInput): Promise<DeletePetUseCaseOutput>{
		let pet = await this.getPetById(input.id)

		if(!pet){
			throw new PetNotFoundError()
		}

		await this.petRepository.delete(input.id)

		return new DeletePetUseCaseOutput()
	}

	private async getPetById(id: string): Promise<Pet>{
		try {
			await this.petRepository.delete(id)
		}catch(error){
			return null
		}
	}
}

