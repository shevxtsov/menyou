import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator'

import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class UpdateUserDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = [
        'username',
        'firstname',
        'lastname',
        'image',
        'is_blocked',
        'role_list'
    ]

    @IsNotEmpty()
    readonly username: string

    @IsNotEmpty()
    readonly firstname: string

    readonly lastname: string

    @IsArray()
    @ArrayMinSize(1)
    readonly role_list: number[]
}
