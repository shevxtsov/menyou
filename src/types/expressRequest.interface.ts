import { Request } from 'express'

import { UserEntity } from 'src/auth/user/user.entity'

export interface IExpressRequest extends Request {
    user?: UserEntity
}
