import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { DeleteResult } from 'typeorm'

import { TransformUpdateBodyPipe } from 'src/shared/pipes/transformUpdateBody.pipe'
import { CreateRoleDto } from './dto/createRole.dto'
import { UpdateRoleDto } from './dto/updateRole.dto'
import { RoleService } from './role.service'
import { IRoleListResponse } from './types/roleListResponse.interface'
import { IRoleResponse } from './types/roleResponse.interface'
import { AdminGuard } from 'src/shared/guards/admin.guard'

@Controller('role')
@UseGuards(AdminGuard)
export class RoleController {
    constructor(private readonly _roleService: RoleService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async createRole(@Body('role') createRoleDto: CreateRoleDto): Promise<any> {
        const role = await this._roleService.createRole(createRoleDto)

        return this._roleService.buildRoleResponse(role)
    }

    @Get('list')
    async getRoleList(@Query() query: any): Promise<IRoleListResponse> {
        return await this._roleService.findAll(query)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe(), new TransformUpdateBodyPipe())
    async updateRole(
        @Param('id') roleId: number,
        @Body('role') updateRoleDto: UpdateRoleDto
    ): Promise<IRoleResponse> {
        const role = await this._roleService.updateRole(roleId, updateRoleDto)

        return this._roleService.buildRoleResponse(role)
    }

    @Delete(':id')
    async deleteRole(@Param('id') roleId: number): Promise<DeleteResult> {
        return await this._roleService.deleteRole(roleId)
    }
}
