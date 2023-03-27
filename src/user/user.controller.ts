import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'

import { TransformUpdateBodyPipe } from 'src/shared/pipes/transformUpdateBody.pipe'
import { DeleteResult } from 'typeorm'
import { User } from './decorators/user.decorator'
import { CreateUserDto } from './dto/createUser.dto'
import { LoginUserDto } from './dto/loginUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { IUserListResponse } from './types/userListResponse.interface'
import { IUserResponse } from './types/userResponse.interface'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body('user') createUserDto: CreateUserDto
    ): Promise<IUserResponse> {
        const user = await this._userService.createUser(createUserDto)

        return this._userService.buildUserResponse(user)
    }

    @Put(':id')
    @UsePipes(new ValidationPipe(), new TransformUpdateBodyPipe())
    async updateUser(
        @Param('id') userId: number,
        @Body('user') updateUserDto: UpdateUserDto
    ): Promise<IUserResponse> {
        const user = await this._userService.updateUser(userId, updateUserDto)

        return this._userService.buildUserResponse(user)
    }

    @Delete(':id')
    async deleteUser(@Param('id') userId: number): Promise<DeleteResult> {
        return this._userService.deleteUser(userId)
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(
        @Body('user') loginUserDto: LoginUserDto
    ): Promise<IUserResponse> {
        const user = await this._userService.login(loginUserDto)

        return this._userService.buildUserResponse(user)
    }

    @Get()
    async getCurrentUser(@User() user: UserEntity): Promise<IUserResponse> {
        return this._userService.buildUserResponse(user)
    }

    @Get('list')
    async getUserList(@Query() query: any): Promise<IUserListResponse> {
        return await this._userService.findAll(query)
    }
}
