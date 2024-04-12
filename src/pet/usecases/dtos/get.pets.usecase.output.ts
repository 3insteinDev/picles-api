export default class GetPetsUseCaseOutput {
	type?: string;
	size?: string;
	gender?: string;
	page?: string;
	itemsPerPage?: string;


	constructor(data: Partial<GetPetsUseCaseOutput>){
		Object.assign(this, data);
	}
}