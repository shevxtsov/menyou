import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MealModule } from './meal/meal.module'
import ormconfig from './ormconfig'
import { ProductModule } from './product/product.module'
import { RoleModule } from './role/role.module'
import { AuthMiddleware } from './user/middlewares/auth.middleware'
import { UserModule } from './user/user.module'
import { FilterModule } from './filter/filter.module'

@Module({
    imports: [
        TypeOrmModule.forRoot(ormconfig),
        UserModule,
        RoleModule,
        ProductModule,
        MealModule,
        FilterModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL
        })
    }
}
