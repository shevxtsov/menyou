import { IsNotEmpty } from 'class-validator'

import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class UpdateProductDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = [
        'name',
        'description',
        'image',
        'in_stock'
    ]

    @IsNotEmpty()
    readonly name: string

    readonly description: string

    readonly image: string

    readonly in_stock: boolean
}
