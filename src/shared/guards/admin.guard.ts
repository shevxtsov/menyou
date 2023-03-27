import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common'

import { IExpressRequest } from 'src/types/expressRequest.interface'

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<IExpressRequest>()

        if (request.user) {
            if (request.user.is_admin) {
                return true
            }
        }

        throw new HttpException('Access denied', HttpStatus.FORBIDDEN)
    }
}
