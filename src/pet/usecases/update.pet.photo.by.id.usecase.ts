import { IUseCase } from "src/domain/iusecase.interface";
import UpdatePetPhotoByIdUseCaseInput from "./dtos/update.pet.photo.usecase.input";
import UpdatePetPhotoByIdUseCaseOutput from "./dtos/update.pet.photo.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import { Pet } from "../schemas/pet.schemas";
import PetNotFoundError from "src/domain/errors/pet.not.found.error";
import AppTokens from "src/app.tokens";
import IFileService from "../interfaces/file.service.interface";
import UpdatePetUseCaseOutput from "./dtos/update.pet.usecase.output";

@Injectable()
export default class UpdatePetPhotoByIdUseCase implements IUseCase<UpdatePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput>{

	constructor(
		@Inject(PetTokens.petRepository)
		private readonly petRepository: IPetRepository,

		@Inject(AppTokens.fileService)
		private readonly fileService: IFileService
	){}

	async run(input: UpdatePetPhotoByIdUseCaseInput): Promise<UpdatePetPhotoByIdUseCaseOutput>{
		let pet = await this.findPetById(input.id)

		if(!pet){
			throw new PetNotFoundError()
		}

		await this.petRepository.update({
			_id: input.id,
			photo: input.photoPath
		})

		const photo = await this.fileService.readFile(input.photoPath)

		return new UpdatePetUseCaseOutput({
			id: pet._id,
			name: pet.name,
			type: pet.type,
			size: pet.size,
			gender: pet.gender,
			bio: pet.bio,
			photo: photo.toString('base64'),
			createdAt: pet.createdAt,
			updatedAt: pet.updatedAt,
		})
	}


	private async findPetById(id: string): Promise<Pet>{
		try {
			return await this.petRepository.getById(id)
		}catch(error){
			return null
		}
	}

}