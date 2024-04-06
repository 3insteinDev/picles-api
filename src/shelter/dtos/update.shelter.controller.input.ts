import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export default class UpdateShelterControllerInput {
	@IsString()
	@IsNotEmpty()
	name: string
	@IsNotEmpty()
	@IsString()
	@Length(10,11 , { message: "errado"})
	whatsapp: string
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string
	@Length(10,11 , { message: "errado"})
	@IsNotEmpty()
	@IsString()
	@IsNumber()
	phone: string
}