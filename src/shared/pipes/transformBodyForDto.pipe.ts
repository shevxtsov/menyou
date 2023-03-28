import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class TransformBodyForDtoPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const { metatype } = metadata
        const object = plainToInstance(metatype, value)

        if (typeof object !== 'object') {
            return value
        }

        const allowedProperties: string[] = Object.values(new metatype())
        const preparedObject = {}
        const transformedObject = {}

        for (const property of allowedProperties) {
            for (const key of property) {
                preparedObject[key] = null
            }
        }

        for (const key in object) {
            if (Object.keys(preparedObject).includes(key)) {
                transformedObject[key] = object[key]
            }
        }

        return transformedObject
    }
}
