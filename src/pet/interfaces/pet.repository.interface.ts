import { Pet } from "../schemas/pet.schemas";
import FindByFilterAndTotal from "../usecases/dtos/find.by.filter.and.total";
import GetPetsUseCaseInput from "../usecases/dtos/get.pets.usecase.input";
import GetPetsUseCaseOutput from "../usecases/dtos/get.pets.usecase.output";

export default interface IPetRepository {
	create(data: Partial<Pet>): Promise<Pet>
	getById(id:string): Promise<Pet>
	update(data: Partial<Pet>): Promise<void>
	delete(id:string): Promise<void>
	findByFilter(input: GetPetsUseCaseInput): Promise<FindByFilterAndTotal>
}