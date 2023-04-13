import { IsNotEmpty } from 'class-validator'

import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class CreateProductDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = [
        'name',
        'description',
        'image'
    ]

    @IsNotEmpty()
    readonly name: string

    readonly description: string

    readonly image: string
}
