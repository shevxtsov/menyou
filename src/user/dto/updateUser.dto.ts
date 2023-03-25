import { IsNotEmpty } from 'class-validator'

export class UpdateUserDto {
    @IsNotEmpty()
    readonly username: string

    @IsNotEmpty()
    readonly firstname: string

    readonly lastname: string
    readonly role_list: number[]
}
