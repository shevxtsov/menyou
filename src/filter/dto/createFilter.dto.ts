import { IsNotEmpty } from 'class-validator'

import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class CreateFilterDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = ['name']

    @IsNotEmpty()
    readonly name: string
}
