import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'

import { CreateRoleDto } from './dto/createRole.dto'
import { UpdateRoleDto } from './dto/updateRole.dto'
import { RoleEntity } from './role.entity'
import { IRoleListResponse } from './types/roleListResponse.interface'
import { IRoleResponse } from './types/roleResponse.interface'
import { IQueryForList } from 'src/shared/types/queryForList.interface'

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly _roleRepository: Repository<RoleEntity>
    ) {}

    public async findAll(query: IQueryForList): Promise<IRoleListResponse> {
        const queryBuilder = this._roleRepository.createQueryBuilder('roles')
        const rolesCount = await queryBuilder.getCount()

        if (query.limit) {
            queryBuilder.limit(query.limit)
        }

        if (query.offset) {
            queryBuilder.offset(query.offset)
        }

        const roles = await queryBuilder.getMany()

        return {
            roles: roles,
            total: rolesCount
        }
    }

    public async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        const existedRole = await this._roleRepository.findOne({
            where: {
                code: createRoleDto.code
            }
        })

        if (existedRole) {
            throw new HttpException(
                'role with the same code already exist',
                HttpStatus.BAD_REQUEST
            )
        }

        const role = new RoleEntity()
        Object.assign(role, createRoleDto)

        return this._roleRepository.save(role)
    }

    public async updateRole(
        roleId: number,
        updateRoleDto: UpdateRoleDto
    ): Promise<RoleEntity> {
        const role = await this.findById(roleId)

        if (!role) {
            throw new HttpException('role doesnt exist', HttpStatus.NOT_FOUND)
        }

        Object.assign(role, updateRoleDto)

        return await this._roleRepository.save(role)
    }

    public async deleteRole(roleId: number): Promise<DeleteResult> {
        const role = await this.findById(roleId)

        if (!role) {
            throw new HttpException('role doesnt exist', HttpStatus.NOT_FOUND)
        }

        return this._roleRepository.delete(roleId)
    }

    private async findById(roleId: number): Promise<RoleEntity> {
        return await this._roleRepository.findOne({
            where: {
                id: roleId
            }
        })
    }

    public buildRoleResponse(role: RoleEntity): IRoleResponse {
        return {
            role
        }
    }
}
