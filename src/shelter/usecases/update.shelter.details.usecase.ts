import { Inject, Injectable } from '@nestjs/common/decorators';
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.intput";
import { IUseCase } from "src/domain/iusecase.interface"
import { ShelterRepository } from './../shelter.repository';
import IShelterRepository from '../interfaces/shelter.reporitory.interfaces';
import ShelterTokens from '../shelter.tokens';

@Injectable()
export default class UpdateShelterDetailsUseCase implements IUseCase<UpdateShelterDetailsUseCaseInput, UpdateShelterDetailsUseCaseOutput>{

	constructor(
		@Inject(ShelterTokens.shelterRepository)
		private readonly shelterRepository: IShelterRepository
	){}
	
	async run(input: UpdateShelterDetailsUseCaseInput): Promise<UpdateShelterDetailsUseCaseOutput> {
		await this.shelterRepository.update(input)

		const shelter = await this.shelterRepository.get()

		return new UpdateShelterDetailsUseCaseOutput({
			name: shelter.name,
			phone: shelter.phone,
			whatsApp: shelter.whatsApp,
			email: shelter.email,
			updatedAt: shelter.updateAt,
			createdAt: shelter.createdAt
		})
	}
}
	

