import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

import { CreateUserDto } from './dto/createUser.dto'
import { UserEntity } from './user.entity'
import { JWT_SECRET } from 'src/config'
import { IUserResponse } from './types/userResponse.interface'
import { LoginUserDto } from './dto/loginUser.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepository: Repository<UserEntity>
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
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

        return await this._userRepository.save(newUser)
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this._userRepository
            .createQueryBuilder('users')
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

        delete user.password

        return user
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

    buildUserResponse(user: UserEntity): IUserResponse {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
}
