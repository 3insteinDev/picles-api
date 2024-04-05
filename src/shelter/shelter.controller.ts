import { Controller } from '@nestjs/common';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import { Body, Delete, Get, Inject, Patch }  from '@nestjs/common/decorators'
import { IUseCase } from 'src/domain/iusecase.interface';
import ShelterTokens from './shelter.tokens';
import UpdateShelterDetailsUseCaseInput from './dtos/update.shelter.controller.input';
import DeleteShelterDetailsUseCaseInput from './dtos/delete.shelter.controller.input';

@Controller('shelter')
export class ShelterController {

	@Inject(ShelterTokens.getShelderDetailsUseCase)
	private readonly getShelterDetailsUseCase: IUseCase<null, GetShelterDetailsUseCaseOutput>
	@Get()
	async getShelterDetails(): Promise<GetShelterDetailsUseCaseOutput>{
        return await this.getShelterDetailsUseCase.run(null)
    }

	@Patch()
	async updateShelterDetails(@Body() input: UpdateShelterDetailsUseCaseInput){
		//return await this.getShelterDetailsUseCase.run(null)
		console.log(input)
	}

	@Delete()
	async deleteShelterDetails(@Body() input: DeleteShelterDetailsUseCaseInput){
		//return await this.getShelterDetailsUseCase.run(null)
		console.log(input)
	}
}


