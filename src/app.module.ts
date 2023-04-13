import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MealModule } from './main/meal/meal.module'
import { ProductModule } from './main/product/product.module'
import { RoleModule } from './auth/role/role.module'
import { AuthMiddleware } from './auth/user/middlewares/auth.middleware'
import { UserModule } from './auth/user/user.module'
import { FilterModule } from './main/filter/filter.module'
import { OrderModule } from './main/order/order.module'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: [__dirname + '/**/*.entity.js'],
            synchronize: false
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
