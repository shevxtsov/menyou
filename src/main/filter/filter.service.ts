import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'

import { FilterEntity } from './filter.entity'
import { CreateFilterDto } from './dto/createFilter.dto'
import { IFilterResponse } from './types/filterResponse.interface'
import { UpdateFilterDto } from './dto/updateFilter.dto'
import { IFilterListResponse } from './types/filterListResponse.interface'

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

    public async updateFilter(
        filterId: number,
        updateFilterDto: UpdateFilterDto
    ): Promise<FilterEntity> {
        const filter = await this.findFilterById(filterId)

        if (!filter) {
            throw new HttpException('filter doesnt exist', HttpStatus.NOT_FOUND)
        }

        Object.assign(filter, updateFilterDto)

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

    public async findAll(): Promise<IFilterListResponse> {
        const queryBuilder =
            this._filterRepository.createQueryBuilder('filters')
        const filtersCount = await queryBuilder.getCount()
        const filters = await queryBuilder.getMany()

        return {
            filters,
            total: filtersCount
        }
    }
}
