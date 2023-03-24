import { IsNotEmpty } from 'class-validator'

export class CreateRoleDto {
    @IsNotEmpty()
    readonly code: string

    @IsNotEmpty()
    readonly name: string
}
