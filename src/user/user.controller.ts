import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'

import { CreateUserDto } from './dto/createUser.dto'
import { LoginUserDto } from './dto/loginUser.dto'
import { IUserResponse } from './types/userResponse.interface'
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

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(
        @Body('user') loginUserDto: LoginUserDto
    ): Promise<IUserResponse> {
        const user = await this._userService.login(loginUserDto)

        return this._userService.buildUserResponse(user)
    }
}
