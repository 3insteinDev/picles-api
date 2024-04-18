import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export default class CreatePetControllerInput{
@IsString()
@IsNotEmpty()
@ApiProperty({description: "Esse será o nome do nosso pet"})
name: string;

@IsString()
@IsNotEmpty()
@ApiProperty({description: "Esse será o tipo do nosso pet"})
type: string;

@IsString()
@IsNotEmpty()
@ApiProperty({description: "Esse será o tamanho do nosso pet"})
size: string;

@IsString()
@IsNotEmpty()
@ApiProperty({description: "Esse será o genero do nosso pet"})
gender: string;

@IsString()
@IsNotEmpty()
@MaxLength(1024)
@ApiProperty({description: "Essa será a biografia do nosso pet"})
bio: string;
}