import { IsNotEmpty } from 'class-validator'

import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class UpdateMealDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = [
        'name',
        'description',
        'image',
        'is_blocked',
        'product_list',
        'filter_list',
        'price'
    ]

    @IsNotEmpty()
    readonly name: string

    readonly description: string

    readonly image: string

    readonly price: number

    readonly is_blocked: boolean

    readonly product_list: number[]

    readonly filter_list: number[]
}
