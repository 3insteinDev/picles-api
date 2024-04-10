export default class UpdatePetUseCaseOutput{
	id: string;
	name: string;
	type: string;
	size: string;
	gender: string;
	bio: string;
	photo: string;
	createdAt: Date;
	updatedAt: Date;


	constructor(data: Partial<UpdatePetUseCaseOutput>){
		Object.assign(this, data);
	}
}
