import { IsNotEmpty } from 'class-validator'

import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class UpdateRoleDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = ['code', 'name']

    @IsNotEmpty()
    readonly code: string

    @IsNotEmpty()
    readonly name: string
}
