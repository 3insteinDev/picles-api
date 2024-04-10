export default class UpdatePetUseCaseInput{
	name: string;
	type: string;
	size: string;
	gender: string;
	bio: string;

	constructor(data: Partial<UpdatePetUseCaseInput>){
		Object.assign(this, data);
	}
}

