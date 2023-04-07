import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'

import { AppModule } from './app.module'

dotenv.config()

const port = process.env.PORT || 3000

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })
    await app.listen(port)
}
bootstrap()
