import { IsNotEmpty } from 'class-validator'

export class UpdateRoleDto {
    public allowedProperties = ['code', 'name']

    @IsNotEmpty()
    readonly code: string

    @IsNotEmpty()
    readonly name: string
}
