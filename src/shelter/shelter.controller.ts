import { Controller } from '@nestjs/common';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import { Body, Delete, Get, Inject, Put }  from '@nestjs/common/decorators'
import { IUseCase } from 'src/domain/iusecase.interface';
import ShelterTokens from './shelter.tokens';
import DeleteShelterDetailsUseCaseInput from './dtos/delete.shelter.controller.input';
import UpdateShelterDetailsUseCaseOutput from './usecases/dtos/update.shelter.details.usecase.output';
import UpdateShelterControllerInput from './dtos/update.shelter.controller.input';
import UpdateShelterDetailsUseCaseInput from './usecases/dtos/update.shelter.details.usecase.intput';

@Controller('shelter')
export class ShelterController {

	@Inject(ShelterTokens.getShelderDetailsUseCase)
	private readonly getShelterDetailsUseCase: IUseCase<null, GetShelterDetailsUseCaseOutput>

	@Inject(ShelterTokens.updateShelderDetailsUseCase)
	private readonly updateShelterDetailsUseCase: IUseCase<UpdateShelterDetailsUseCaseInput, UpdateShelterDetailsUseCaseOutput>

	@Get()
	async getShelterDetails(): Promise<GetShelterDetailsUseCaseOutput>{
        return await this.getShelterDetailsUseCase.run(null)
    }

	@Put()
	async updateShelterDetails(@Body() input: UpdateShelterControllerInput){
		const useCaseInput = new UpdateShelterDetailsUseCaseInput({...input});
		return await this.updateShelterDetailsUseCase.run(useCaseInput)
	}

	@Delete()
	async deleteShelterDetails(@Body() input: DeleteShelterDetailsUseCaseInput){
		//return await this.getShelterDetailsUseCase.run(null)
		console.log(input)
	}
}


