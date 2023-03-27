import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable
} from '@nestjs/common'

import { IExpressRequest } from 'src/types/expressRequest.interface'

@Injectable()
export class MasterGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<IExpressRequest>()

        if (request.user) {
            const roles: string[] = request.user.role_list.map(
                (role) => role.code
            )

            if (roles.includes('MASTER')) {
                return true
            }
        }

        throw new HttpException('Access denied', HttpStatus.FORBIDDEN)
    }
}
