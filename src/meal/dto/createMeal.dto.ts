import { IsNotEmpty } from 'class-validator'

import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class CreateMealDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = [
        'name',
        'description',
        'image',
        'product_list'
    ]

    @IsNotEmpty()
    readonly name: string

    readonly description: string

    readonly image: string

    readonly product_list: number[]
}
