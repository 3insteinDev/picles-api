import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
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
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import DeletePetUseCaseOutput from './usecases/dtos/delete.pet.usecase.output c';
import DeletePetUseCaseInput from './usecases/dtos/delete.pet.usecase.input';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/config/multer.config';
import UpdatePetPhotoByIdUseCaseInput from './usecases/dtos/update.pet.photo.usecase.input';
import UpdatePetPhotoByIdUseCaseOutput from './usecases/dtos/update.pet.photo.usecase.output';
import GetPetsUseCaseInput from './usecases/dtos/get.pets.usecase.input';
import GetPetsUseCaseOutput from './usecases/dtos/get.pets.usecase.output';

@Controller('pet')
export class PetController {

	@Inject(PetTokens.getPetsUseCase)
	private readonly getPetsUseCase: IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput>

	@Inject(PetTokens.createPetUseCase)
	private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

	@Inject(PetTokens.updatePetUseCase)
	private readonly updatePetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

	@Inject(PetTokens.getPetByIdUseCase)
	private readonly getPetByIdUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>

	@Inject(PetTokens.deletePetUseCase)
	private readonly deletePetUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>

	@Inject(PetTokens.updatePetPhotoByIdUseCase)
	private readonly updatePetPhotoByIdUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>

	@Get()
	async getPets(
		@Query('type') type?: string,
		@Query('size') size?: string,
		@Query('gender') gender?: string,
		@Query('page') page?: string,
		@Query('itemsPerPage') itemsPerPage?: string,
	): Promise<GetPetsUseCaseOutput>{
		const FIRST_PAGE = 1;
		const DEFAULT_ITENS_PER_PAGE = 10;
		const useCaseInput = new GetPetsUseCaseInput({
			type: !!type ? type : null,
			size: !!size ? size : null,
			gender: !!gender ? gender : null,
			page: !!page ? parseInt(page) : FIRST_PAGE,
			itemsPerPage: !!itemsPerPage ? parseInt(itemsPerPage) : DEFAULT_ITENS_PER_PAGE
		})

		return await this.getPetsUseCase.run(useCaseInput)
	}

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

	@Put(':id')
	async updatePet(@Body() input: UpdatePetControllerInput, @Param('id') id: string){
		try{
			const useCaseInput = new UpdatePetUseCaseInput({
				...input,
				id
			});
		}catch(error){
			throw new BadRequestException(JSON.parse(error.message))
		}
	}

	@Delete(':id')
	async deletePet(@Param('id') id:string):Promise<void>{
		try{
			const useCaseInput = new DeletePetUseCaseInput({id})
			await this.deletePetUseCase.run(useCaseInput);
		}catch(error){
			throw new BadRequestException(JSON.parse(error.message))
		}
	}

	@Patch(':id/photo')
	@UseInterceptors(FileInterceptor('photo', multerConfig))
	async updatePhoto(
		@UploadedFile() photo: Express.Multer.File,
		@Param('id') id: string,
	): Promise<UpdatePetPhotoByIdUseCaseOutput>{
		try{
			const useCaseInput = new UpdatePetPhotoByIdUseCaseInput({
				id,
				photoPath: photo.path
			})
			return await this.updatePetPhotoByIdUseCase.run(useCaseInput)
		}catch(error){
			throw new BadRequestException(JSON.parse(error.message))
		}
	}
}
