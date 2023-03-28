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

import { AdminGuard } from 'src/shared/guards/admin.guard'
import { TransformBodyForDtoPipe } from 'src/shared/pipes/transformBodyForDto.pipe'
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
    @UseGuards(AdminGuard)
    @UsePipes(new ValidationPipe(), new TransformBodyForDtoPipe())
    async createUser(
        @Body('user') createUserDto: CreateUserDto
    ): Promise<IUserResponse> {
        const user = await this._userService.createUser(createUserDto)

        return this._userService.buildUserResponse(user)
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    @UsePipes(new ValidationPipe(), new TransformBodyForDtoPipe())
    async updateUser(
        @Param('id') userId: number,
        @Body('user') updateUserDto: UpdateUserDto
    ): Promise<IUserResponse> {
        const user = await this._userService.updateUser(userId, updateUserDto)

        return this._userService.buildUserResponse(user)
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
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
    @UseGuards(AdminGuard)
    async getUserList(@Query() query: any): Promise<IUserListResponse> {
        return await this._userService.findAll(query)
    }
}
