import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'

import { FilterEntity } from './filter.entity'
import { CreateFilterDto } from './dto/createFilter.dto'
import { IFilterResponse } from './types/filterResponse.interface'

@Injectable()
export class FilterService {
    constructor(
        @InjectRepository(FilterEntity)
        private readonly _filterRepository: Repository<FilterEntity>
    ) {}

    public async createFilter(
        createFilterDto: CreateFilterDto
    ): Promise<FilterEntity> {
        const filter = new FilterEntity()

        Object.assign(filter, createFilterDto)

        return await this._filterRepository.save(filter)
    }

    public async deleteFilter(filterId: number): Promise<DeleteResult> {
        const filter = await this.findFilterById(filterId)

        if (!filter) {
            throw new HttpException('filter doesnt exist', HttpStatus.NOT_FOUND)
        }

        return await this._filterRepository.delete(filterId)
    }

    public async findFilterById(filterId: number): Promise<FilterEntity> {
        return await this._filterRepository.findOne({
            where: {
                id: filterId
            }
        })
    }

    public buildFilterResponse(filter: FilterEntity): IFilterResponse {
        return {
            filter
        }
    }
}
