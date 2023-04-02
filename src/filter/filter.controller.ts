import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
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

    @Delete(':id')
    async deleteFilter(@Param('id') filterId: number): Promise<DeleteResult> {
        return await this._filterService.deleteFilter(filterId)
    }
}
