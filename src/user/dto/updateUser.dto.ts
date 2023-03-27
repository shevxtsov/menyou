import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator'

export class UpdateUserDto {
    public allowedProperties = [
        'username',
        'firstname',
        'lastname',
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
