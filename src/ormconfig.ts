import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const config: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [__dirname + '/**/*.entity.js'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts, .js}']
}

export default config
