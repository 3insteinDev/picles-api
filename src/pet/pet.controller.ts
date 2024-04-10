import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import PetTokens from './pet.tokens';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import UpdatePetUseCaseInput from './usecases/dtos/update.pet.usecase.input';
import GetPetByIdUseCase from './usecases/get.pet.by.id.usecase';
import GetPetByIdUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdUseCaseOutput from './usecases/dtos/get.pet.by.id.usecase.output';
import { error } from 'console';

@Controller('pet')
export class PetController {

	@Inject(PetTokens.createPetUseCase)
	private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

	@Inject(PetTokens.updatePetUseCase)
	private readonly updatePetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

	@Inject(PetTokens.getPetByIdUseCase)
	private readonly getPetByIdUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>


	@Get(':id')
	async getByPet(@Param('id') id: string): Promise<CreatePetUseCaseOutput>{
		try{
			const useCaseInput = new GetPetByIdUseCaseInput({id})
			return await this.getPetByIdUseCase.run(useCaseInput)
		}catch(error){
			throw new BadRequestException(JSON.parse(error.message))
		}
	}

	@Post()
	async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput>{
		const useCaseInput = new CreatePetUseCaseInput({...input})
		return await this.createPetUseCase.run(useCaseInput)
	}

	@Put()
	async updatePet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseInput>{
		const useCaseInput = new UpdatePetUseCaseInput({...input});
		return await this.updatePetUseCase.run(useCaseInput)
	}


}


