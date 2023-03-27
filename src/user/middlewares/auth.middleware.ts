import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware
} from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { JWT_SECRET } from 'src/config'
import { IExpressRequest } from 'src/types/expressRequest.interface'
import { UserService } from '../user.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly _userService: UserService) {}

    async use(req: IExpressRequest, res: Response, next: NextFunction) {
        if (req.url.includes('user/login')) {
            req.user = null
            next()

            return
        }

        if (!req.headers.authorization) {
            req.user = null

            throw new HttpException('not authorized', HttpStatus.UNAUTHORIZED)
        }

        const token = req.headers.authorization.split(' ')[1]

        try {
            const decode: any = verify(token, JWT_SECRET)
            const user = await this._userService.findUserByIdWithRoles(
                decode.id
            )

            req.user = user
            next()
        } catch (err) {
            req.user = null
            next()
        }
    }
}
