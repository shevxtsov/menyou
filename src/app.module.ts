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
import { OrderModule } from './order/order.module'

const databaseURL =
    'postgres://menyou-main-db-0a6f902cce65848ac:YkA9sWZS53eaAE7PD4B6gX9z645FCP@user-prod-us-east-2-1.cluster-cfi5vnucvv3w.us-east-2.rds.amazonaws.com:5432/menyou-main-db-0a6f902cce65848ac'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: databaseURL
        }),
        UserModule,
        RoleModule,
        ProductModule,
        MealModule,
        FilterModule,
        OrderModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(AuthMiddleware)
            .exclude({
                path: 'user/login',
                method: RequestMethod.POST
            })
            .forRoutes({
                path: '*',
                method: RequestMethod.ALL
            })
    }
}
