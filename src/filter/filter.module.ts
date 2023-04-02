import { Module } from '@nestjs/common'

import { FilterController } from './filter.controller'
import { FilterService } from './filter.service'

@Module({
    imports: [],
    controllers: [FilterController],
    providers: [FilterService]
})
export class FilterModule {}
