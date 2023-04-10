import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MealModule } from './meal/meal.module'
import { ProductModule } from './product/product.module'
import { RoleModule } from './role/role.module'
import { AuthMiddleware } from './user/middlewares/auth.middleware'
import { UserModule } from './user/user.module'
import { FilterModule } from './filter/filter.module'
import { OrderModule } from './order/order.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL
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
