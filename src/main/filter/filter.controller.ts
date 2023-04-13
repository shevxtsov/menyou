import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'

import { CreateFilterDto } from './dto/createFilter.dto'
import { IFilterResponse } from './types/filterResponse.interface'
import { FilterService } from './filter.service'
import { TransformBodyForDtoPipe } from 'src/shared/pipes/transformBodyForDto.pipe'
import { DeleteResult } from 'typeorm'
import { MasterGuard } from 'src/shared/guards/master.guard'
import { UpdateFilterDto } from './dto/updateFilter.dto'
import { IFilterListResponse } from './types/filterListResponse.interface'

@Controller('filter')
@UseGuards(MasterGuard)
export class FilterController {
    constructor(private readonly _filterService: FilterService) {}

    @Post()
    @UsePipes(new ValidationPipe(), new TransformBodyForDtoPipe())
    async createFilter(
        @Body('filter') createFilterDto: CreateFilterDto
    ): Promise<IFilterResponse> {
        const filter = await this._filterService.createFilter(createFilterDto)

        return this._filterService.buildFilterResponse(filter)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe(), new TransformBodyForDtoPipe())
    async updateFilter(
        @Param('id') filterId: number,
        @Body('filter') updateFilterDto: UpdateFilterDto
    ): Promise<IFilterResponse> {
        const filter = await this._filterService.updateFilter(
            filterId,
            updateFilterDto
        )

        return this._filterService.buildFilterResponse(filter)
    }

    @Delete(':id')
    async deleteFilter(@Param('id') filterId: number): Promise<DeleteResult> {
        return await this._filterService.deleteFilter(filterId)
    }

    @Get('list')
    async findAll(): Promise<IFilterListResponse> {
        return await this._filterService.findAll()
    }
}
