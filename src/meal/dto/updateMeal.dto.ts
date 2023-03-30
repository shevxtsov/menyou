import { IsNotEmpty } from 'class-validator'

import { ITransformEntityDto } from 'src/shared/types/transformEntityDto.interface'

export class UpdateMealDto implements ITransformEntityDto {
    public readonly allowedProperties: string[] = [
        'name',
        'description',
        'image',
        'is_blocked'
    ]

    @IsNotEmpty()
    readonly name: string

    readonly description: string

    readonly image: string

    readonly is_blocked: boolean
}
