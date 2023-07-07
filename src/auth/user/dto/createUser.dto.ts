import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator'

import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class CreateUserDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = [
        'username',
        'password',
        'firstname',
        'lastname',
        'image',
        'role_list'
    ]

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
