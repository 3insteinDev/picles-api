import { IUseCase } from "src/domain/iusecase.interface"
import GetShelterDetailsUseCaseOutput from "./dtos/get.shelter.details.usecase.output"

export default class GetShelterDetailsUseCase implements IUseCase<null, GetShelterDetailsUseCaseOutput>{
	run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
		return Promise.resolve(new GetShelterDetailsUseCaseOutput({
			shelterName: 'Abrigo Bigo',
			shelterEmail: 'abb@gmail.com',
			shelterPhone: '13999889988',
			shelterWhatsApp: '13999889988',
			createdAt: new Date(),
			updatedAt: new Date()
		}))
	}
}
	

