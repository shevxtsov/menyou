import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, In, Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

import { CreateUserDto } from './dto/createUser.dto'
import { UserEntity } from './user.entity'
import { JWT_SECRET } from 'src/config'
import { IUserResponse } from './types/userResponse.interface'
import { LoginUserDto } from './dto/loginUser.dto'
import { IUserListResponse } from './types/userListResponse.interface'
import { RoleEntity } from 'src/role/role.entity'
import { UpdateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly _roleRepository: Repository<RoleEntity>
    ) {}

    public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByUsername = await this._userRepository.findOne({
            where: {
                username: createUserDto.username
            }
        })

        if (userByUsername) {
            throw new HttpException(
                'user already exist',
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)

        const roles: RoleEntity[] = await this.getRolesbyIds(
            createUserDto.role_list
        )

        newUser.role_list = roles

        return await this._userRepository.save(newUser)
    }

    public async updateUser(
        userId: number,
        updateUserDto: UpdateUserDto
    ): Promise<UserEntity> {
        const user = await this._userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.role_list', 'roles')
            .where('users.id = :id', {
                id: userId
            })
            .getOne()

        if (!user) {
            throw new HttpException('user doesnt exist', HttpStatus.NOT_FOUND)
        }

        const roles: RoleEntity[] = await this.getRolesbyIds(
            updateUserDto.role_list
        )

        Object.assign(user, updateUserDto)
        user.role_list = roles

        return this._userRepository.save(user)
    }

    public async deleteUser(userId: number): Promise<DeleteResult> {
        const user = await this.findUserById(userId)

        if (!user) {
            throw new HttpException('user doesnt exist', HttpStatus.NOT_FOUND)
        }

        return this._userRepository.delete(userId)
    }

    public async getRolesbyIds(roles: number[]): Promise<RoleEntity[]> {
        const returnedRoles = await this._roleRepository.find({
            where: {
                id: In(roles)
            }
        })

        if (returnedRoles.length !== roles.length) {
            throw new HttpException(
                'Some of the roles you supplied were not found',
                HttpStatus.NOT_FOUND
            )
        }

        return returnedRoles
    }

    public async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this._userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.role_list', 'roles')
            .addSelect('users.password')
            .where('users.username = :username', {
                username: loginUserDto.username
            })
            .getOne()

        if (!user) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.BAD_REQUEST
            )
        }

        const isCorrectPassword = await compare(
            loginUserDto.password,
            user.password
        )

        if (!isCorrectPassword) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.BAD_REQUEST
            )
        }

        return user
    }

    public async findAll(query: any): Promise<IUserListResponse> {
        const queryBuilder = this._userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.role_list', 'roles')
        const usersCount = await queryBuilder.getCount()

        if (query.limit) {
            queryBuilder.limit(query.limit)
        }

        if (query.offset) {
            queryBuilder.offset(query.offset)
        }

        const users = await queryBuilder.getMany()

        return {
            users: users,
            total: usersCount
        }
    }

    public async findUserByIdWithRoles(userId: number): Promise<UserEntity> {
        return await this._userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.role_list', 'roles')
            .where('users.id = :id', {
                id: userId
            })
            .getOne()
    }

    public findUserById(userId: number): Promise<UserEntity> {
        return this._userRepository.findOne({
            where: {
                id: userId
            }
        })
    }

    private generateJwt(user: UserEntity): string {
        return sign(
            {
                id: user.id,
                username: user.username,
                is_admin: user.is_admin,
                is_blocked: user.is_blocked
            },
            JWT_SECRET
        )
    }

    public buildUserResponse(user: UserEntity): IUserResponse {
        delete user.password

        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
}
