import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'

import { CreateUserDto } from './dto/createUser.dto'
import { UserEntity } from './user.entity'
import { JWT_SECRET } from 'src/config'
import { IUserResponse } from './types/userResponse.interface'

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
