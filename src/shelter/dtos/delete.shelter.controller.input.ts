import { IsNotEmpty, IsString} from "class-validator"

export default class DeleteShelterDetailsUseCaseInput {
	@IsString()
	@IsNotEmpty()
	name: string
}