import { IUseCase } from "src/domain/iusecase.interface"
import { Inject, Injectable } from '@nestjs/common/decorators';
import UpdateShelterDetailsUseCaseOutput from "./dtos/update.shelter.details.usecase.output";
import UpdateShelterDetailsUseCaseInput from "./dtos/update.shelter.details.usecase.intput";

@Injectable()
export default class UpdateShelterDetailsUseCase implements IUseCase<UpdateShelterDetailsUseCaseInput, UpdateShelterDetailsUseCaseOutput>{
	
	run(input: UpdateShelterDetailsUseCaseInput): Promise<UpdateShelterDetailsUseCaseOutput> {
		throw new Error("Method not implemented.");
	}
}
	

