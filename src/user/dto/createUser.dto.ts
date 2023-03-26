import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string

    @IsNotEmpty()
    readonly password: string

    @IsNotEmpty()
    readonly firstname: string

    readonly lastname: string

    @IsArray()
    @ArrayMinSize(1)
    readonly role_list: number[]
}
