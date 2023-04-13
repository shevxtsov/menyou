import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RoleEntity } from 'src/auth/role/role.entity'
import { UserController } from './user.controller'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
