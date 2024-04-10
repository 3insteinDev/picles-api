import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import PetTokens from './pet.tokens';
import CreatePetUseCase from './usecases/create.pet.usecase';
import PetRepository from './pet.repository';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './schemas/pet.schemas';
import UpdatePetUseCase from './usecases/update.pet.usecase';
import GetPetByIdUseCase from './usecases/get.pet.by.id.usecase';

@Module({
  controllers: [PetController],
  imports: [MongooseModule.forFeature([{name: Pet.name, schema: PetSchema}])],
  providers:[
	{
		provide: PetTokens.createPetUseCase,
		useClass: CreatePetUseCase
	},
	{
		provide: PetTokens.petRepository,
		useClass: PetRepository
	},
	{
		provide: PetTokens.updatePetUseCase,
		useClass: UpdatePetUseCase
	},
	{
		provide: PetTokens.getPetByIdUseCase,
		useClass: GetPetByIdUseCase
	}
  ]
})
export class PetModule {}
