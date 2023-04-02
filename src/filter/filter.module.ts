import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FilterController } from './filter.controller'
import { FilterService } from './filter.service'
import { FilterEntity } from './filter.entity'

@Module({
    imports: [TypeOrmModule.forFeature([FilterEntity])],
    controllers: [FilterController],
    providers: [FilterService]
})
export class FilterModule {}
