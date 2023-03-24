import { IsNotEmpty } from 'class-validator'

export class UpdateRoleDto {
    @IsNotEmpty()
    readonly code: string

    @IsNotEmpty()
    readonly name: string
}
